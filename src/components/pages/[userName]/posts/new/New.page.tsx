import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  InputGroup,
  InputRightElement,
  Radio,
  RadioGroup,
  Spinner,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { FC, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/Button';
import { CreatableSelect } from '@/components/ui/CreatableSelect';
import { Input } from '@/components/ui/Input';
import { Panel } from '@/components/ui/Panel';
import { Textarea } from '@/components/ui/Textarea';
import { DummyPlayer, VideoPlayer } from '@/components/ui/VideoPlayer';
import { YoutubePlayer } from '@/components/ui/YoutubePlayer';
import { toast } from '@/lib/chakraUI/theme';
import { useCategories } from '@/repositories/category';
import { postsRepository, useNicovideoInfo } from '@/repositories/posts';
import {
  NewPostParams,
  PostFormParamsOnCreate,
  postFormSchemaOnCreate,
} from '@/types/domains/post';
import { getEmbedUrl, validateUrl } from '@/utils/domains/post/video';
import { getPath } from '@/utils/route/Link';
import { Paths } from '@/utils/route/paths';

type NewPostFormParams = Omit<NewPostParams, 'videoId'> & { videoUrl: string };

const placeholders = {
  youtube: 'https://www.youtube.com/watch?v=ABCD123 | https://youtu.be/ABCD123',
  // playlist: 'https://www.youtube.com/playlist?list=ABCD123',
  nicovideo:
    'https://www.nicovideo.jp/watch/sm1234567 | https://nico.ms/sm1234567',
};

type Props = {
  userName: string;
};
export const NewPage: FC<Props> = ({ userName }) => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isValid, isDirty },
    watch,
    trigger,
    getValues,
    setValue,
  } = useForm<PostFormParamsOnCreate>({
    mode: 'all',
    defaultValues: { type: 'youtube', videoUrl: '', categories: [] },
    resolver: zodResolver(postFormSchemaOnCreate),
  });
  const { data, error } = useCategories(userName);
  const categoryOptions = data
    ? data.map((c) => {
        return {
          id: c.id,
          label: c.name,
          value: c.name,
        };
      })
    : [];

  const categoriesError =
    watch('categories').length > 5
      ? '??????????????????5????????????????????????????????????.'
      : null; // TODO: ?????????zod?????????????????????

  const urlValidationResult = validateUrl(watch('type'), watch('videoUrl'));
  const isNicovideo = watch('type') === 'nicovideo';

  const { data: nicovideoData, error: nicovideoInfoError } = useNicovideoInfo(
    isNicovideo && urlValidationResult.isValid
      ? urlValidationResult.videoId
      : undefined
  );
  const nicovideoInfoLoading =
    isNicovideo &&
    urlValidationResult.isValid &&
    !nicovideoInfoError &&
    !nicovideoData;

  const setYoutubeVideoTitle = useCallback((title: string) => {
    setValue('title', title);
    trigger('title');
  }, []);

  const onSubmit = async (values: NewPostFormParams) => {
    if (urlValidationResult.isValid) {
      try {
        const newPost = await postsRepository.createPost(
          {
            ...values,
            videoId: urlValidationResult.videoId,
            thumbnailUrl: nicovideoData?.thumbnailUrl,
          },
          userName
        );
        router.push(
          getPath({
            path: Paths.post,
            params: { userName, postId: newPost.id },
          })
        );
      } catch (e) {
        toast({
          title: '???????????????????????????',
          status: 'error',
        });
      }
    } else {
      toast({
        title: '???????????????????????????.',
        description: 'URL???????????????.',
        status: 'error',
      });
    }
  };

  useEffect(() => {
    if (isDirty) {
      trigger('videoUrl');
    }
  }, [getValues('type')]);

  useEffect(() => {
    if (isDirty) {
      if (nicovideoData?.title) {
        setValue('title', nicovideoData.title);
        trigger('title');
      } else {
        setValue('title', '');
        trigger('title');
      }
    }
  }, [nicovideoData?.title, isDirty]);

  return (
    <Panel pt={0} px={0}>
      <Flex direction="column" gridGap={4}>
        {urlValidationResult.isValid ? (
          isNicovideo ? (
            <VideoPlayer
              embedUrl={getEmbedUrl(watch('type'), urlValidationResult.videoId)}
            />
          ) : (
            <YoutubePlayer
              videoId={urlValidationResult.videoId}
              setVideoTitle={setYoutubeVideoTitle}
            />
          )
        ) : (
          <DummyPlayer />
        )}
        <Flex
          as="form"
          direction="column"
          gridGap={4}
          px={4}
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormControl>
            <FormLabel>???????????????</FormLabel>
            <RadioGroup name="type" defaultValue="youtube">
              <HStack spacing="6">
                <Radio value="youtube" {...register('type')}>
                  Youtube
                </Radio>
                <Radio {...register('type')} value="nicovideo">
                  ??????????????????
                </Radio>
              </HStack>
            </RadioGroup>
          </FormControl>

          <FormControl isInvalid={!!errors.videoUrl}>
            <FormLabel htmlFor="videoUrl">??????URL</FormLabel>
            <Input
              id="videoUrl"
              placeholder={placeholders[watch('type')]}
              defaultValue=""
              {...register('videoUrl')}
            />
            <FormErrorMessage>
              {errors.videoUrl && errors.videoUrl.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.title}>
            <FormLabel htmlFor="title">????????????</FormLabel>
            <InputGroup>
              <Input
                id="title"
                placeholder="?????????????????????"
                {...register('title')}
              />
              {nicovideoInfoLoading && (
                <InputRightElement>
                  <Spinner color="primary.500" />
                </InputRightElement>
              )}
            </InputGroup>

            <FormErrorMessage>
              {errors.title && errors.title.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!categoriesError}>
            <FormLabel htmlFor="categories">???????????????</FormLabel>
            <CreatableSelect
              isMulti
              name="categories"
              placeholder="??????????????????????????????"
              options={categoryOptions}
              onChange={(values) => {
                setValue('categories', [...values]);
              }}
              formatCreateLabel={(value) => `????????????????????????: ${value}`}
              noOptionsMessage={() => '????????????????????????????????????????????????'}
            />
            <FormErrorMessage>
              {categoriesError && categoriesError}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.body}>
            <FormLabel htmlFor="content">??????</FormLabel>
            <Textarea
              id="content"
              placeholder="????????????????????????????????????????????????"
              {...register('body')}
            />
            <FormErrorMessage>
              {errors.body && errors.body.message}
            </FormErrorMessage>
          </FormControl>
          <Button
            colorScheme="primary"
            type="submit"
            width="full"
            isLoading={isSubmitting}
            disabled={
              nicovideoInfoLoading ||
              !isValid ||
              !!nicovideoInfoError ||
              !!categoriesError
            }
          >
            ????????????
          </Button>
        </Flex>
      </Flex>
    </Panel>
  );
};
