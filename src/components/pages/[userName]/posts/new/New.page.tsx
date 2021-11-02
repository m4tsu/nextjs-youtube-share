import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Radio,
  RadioGroup,
  Textarea,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { FC, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/Button';
import { CreatableSelect } from '@/components/ui/MultiSelect';
import { Panel } from '@/components/ui/Panel';
import { DummyPlayer, VideoPlayer } from '@/components/ui/VideoPlayer';
import { YoutubePlayer } from '@/components/ui/YoutubePlayer';
import { toast } from '@/lib/chakraUI/theme';
import { createPost, useNicovideoInfo } from '@/repositories/posts';
import {
  NewPostParams,
  PostFormParams,
  postFormSchema,
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

export const NewPage: FC = () => {
  const router = useRouter();
  const { userName } = router.query as { userName: string };

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isValid, isDirty },
    watch,
    trigger,
    getValues,
    setValue,
  } = useForm<PostFormParams>({
    mode: 'all',
    defaultValues: { type: 'youtube', videoUrl: '' },
    resolver: zodResolver(postFormSchema),
  });
  console.log(errors, isSubmitting, isValid, isDirty);
  console.log(postFormSchema.safeParse(getValues()));
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
    console.log(values, nicovideoData);
    console.log(urlValidationResult);
    if (urlValidationResult.isValid) {
      try {
        const newPost = await createPost(
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
        console.log('catch error', e);
        toast({
          title: '投稿が失敗しました',
          status: 'error',
        });
      }
    } else {
      toast({
        title: '投稿が失敗しました.',
        description: 'URLが不正です.',
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
  }, [nicovideoData?.title]);

  return (
    <Panel>
      <Flex
        as="form"
        direction="column"
        gridGap={4}
        onSubmit={handleSubmit(onSubmit)}
      >
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

        <FormControl>
          <FormLabel>動画サイト</FormLabel>
          <RadioGroup name="type" defaultValue="youtube">
            <HStack spacing="6">
              <Radio value="youtube" {...register('type')}>
                Youtube
              </Radio>
              <Radio {...register('type')} value="nicovideo">
                ニコニコ動画
              </Radio>
            </HStack>
          </RadioGroup>
        </FormControl>

        <FormControl isInvalid={!!errors.videoUrl}>
          <FormLabel htmlFor="videoUrl">動画URL</FormLabel>
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
          <FormLabel htmlFor="title">タイトル</FormLabel>
          <Input
            id="title"
            placeholder="投稿のタイトル"
            {...register('title')}
          />
          <FormErrorMessage>
            {errors.title && errors.title.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="categories">カテゴリー</FormLabel>
          <CreatableSelect
            isMulti
            options={[
              { value: 'A', label: 'カテゴリA' },
              { value: 'B', label: 'カテゴリB' },
              { value: 'C', label: 'カテゴリC' },
            ]}
            onChange={(values) => {
              console.log(values);
            }}
          />
        </FormControl>

        <FormControl isInvalid={!!errors.body}>
          <FormLabel htmlFor="content">本文</FormLabel>
          <Textarea
            id="content"
            placeholder="動画の感想などを入力してください"
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
          disabled={nicovideoInfoLoading || !isValid || !!nicovideoInfoError}
        >
          投稿する
        </Button>
      </Flex>
    </Panel>
  );
};
