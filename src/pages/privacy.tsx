import {
  Flex,
  ListItem,
  Text,
  OrderedList,
  UnorderedList,
} from '@chakra-ui/layout';
import { NextAppPage } from 'next';
import { FC } from 'react';

const Item: FC = ({ children }) => (
  <Flex flexDirection="column" sx={{ gap: '1rem' }}>
    {children}
  </Flex>
);

const Page: NextAppPage = () => (
  <Flex
    flexDirection="column"
    maxWidth="800px"
    margin="0 auto"
    sx={{ gap: '1rem' }}
    borderColor="darkPrimary.200"
    borderWidth="1px"
    borderRadius="md"
    p={8}
  >
    <Text as="h1" fontSize="xl">
      プライバシーポリシー
    </Text>
    <Text>
      Tubetter（以下，「当社」といいます。）は，本ウェブサイト上で提供するサービス（以下,「本サービス」といいます。）におけるプライバシー情報の取扱いについて，以下のとおりプライバシーポリシー（以下，「本ポリシー」といいます。）を定めます。
    </Text>

    <Item>
      <Text as="h3" fontSize="lg">
        第1条（個人情報）
      </Text>
      <Text>当サービスでは、以下の情報を保存しています。</Text>
      <Text>
        ご登録に際に必要に応じて提供をお願いする、メールアドレスなどの個人情報
      </Text>
      <Text>
        ユーザーが、ソーシャルネットワークサービス等の外部サービスとの連携を許可した場合に、当該外部サービスでユーザーが利用するID及び、その他当該外部サービスのプライバシー設定によりユーザーが開示を認めた情報
      </Text>
      {/* 
      <OrderedList>
        <ListItem>
          プライバシー情報のうち「個人情報」とは，個人情報保護法にいう「個人情報」を指すものとし，生存する個人に関する情報であって，当該情報に含まれる氏名，生年月日，住所，電話番号，連絡先その他の記述等により特定の個人を識別できる情報を指します。
        </ListItem>
        <ListItem>
          プライバシー情報のうち「履歴情報および特性情報」とは，上記に定める「個人情報」以外のものをいい，ご利用いただいたサービスやご購入いただいた商品，ご覧になったページや広告の履歴，ユーザーが検索された検索キーワード，ご利用日時，ご利用の方法，ご利用環境，郵便番号や性別，職業，年齢，ユーザーのIPアドレス，クッキー情報，位置情報，端末の個体識別情報などを指します。
        </ListItem>
      </OrderedList> */}
    </Item>

    <Item>
      <Text as="h3" fontSize="lg">
        第2条（個人情報の収集方法）
      </Text>
      <Text>
        当社は、業務の遂行にあたり、個人情報を取得することがあり、取得を行う際は、適正かつ公正な手段により行い、利用目的をあらかじめ公表するか、取得後速やかにご本人に通知または公表いたします。
      </Text>
      <OrderedList>
        <ListItem>
          プライバシー情報のうち「個人情報」とは，個人情報保護法にいう「個人情報」を指すものとし，生存する個人に関する情報であって，当該情報に含まれる氏名，生年月日，住所，電話番号，連絡先その他の記述等により特定の個人を識別できる情報を指します。
        </ListItem>
        <ListItem>
          プライバシー情報のうち「履歴情報および特性情報」とは，上記に定める「個人情報」以外のものをいい，ご利用いただいたサービスやご購入いただいた商品，ご覧になったページや広告の履歴，ユーザーが検索された検索キーワード，ご利用日時，ご利用の方法，ご利用環境，郵便番号や性別，職業，年齢，ユーザーのIPアドレス，クッキー情報，位置情報，端末の個体識別情報などを指します。
        </ListItem>
      </OrderedList>
    </Item>

    <Item>
      <Text as="h3" fontSize="lg">
        第3条（個人情報を収集・利用する目的）
      </Text>
      <Text>
        当社は、取得した個人情報を下記の目的の範囲内で適切に利用いたします。
      </Text>
      <UnorderedList>
        <ListItem>サービス全般の提供のため</ListItem>
        <ListItem>サービスへのログインに伴う本人確認のため</ListItem>
        <ListItem>広告配信のため</ListItem>
        <ListItem>
          お客様のサービス利用状況に関する調査、統計、分析のため
        </ListItem>
        <ListItem>システムの維持、不具合対応のため</ListItem>
        <ListItem>
          法令等により提供が必要な場合に、適切な第三者への情報開示責任を遂行するため
        </ListItem>
      </UnorderedList>
    </Item>

    <Item>
      <Text as="h3" fontSize="lg">
        第4条（クッキー）
      </Text>
      <Text>
        クッキーとは、ユーザーが当社のウェブサイトに訪問された際、ユーザーの使用するコンピュータのブラウザとサーバとの間で送受信されるデータを指します。クッキーはお客様のコンピュータのブラウザ内に保存され、サーバから参照されることがあります。当社は、下記の目的の範囲内でクッキーを使用します。
      </Text>
      <UnorderedList>
        <ListItem>
          お客様のログイン状況の確認や本サービスの各種機能の実装のため
        </ListItem>
        <ListItem>
          当社ウェブサイトの利用状況の調査や、広告、マーケティング、サービス改善のため
        </ListItem>
        <ListItem>広告配信のため</ListItem>
      </UnorderedList>
    </Item>

    <Item>
      <Text as="h3" fontSize="lg">
        第5条（個人情報の第三者提供）
      </Text>
      <Text>
        当社は、お客様の個人情報を下記の場合を除いて第三者に提供することはいたしません。
      </Text>
      <UnorderedList>
        <ListItem>お客様からの事前の同意がある場合</ListItem>
        <ListItem>
          お客様が第三者の生命・身体・財産その他正当な利益を害する可能性があると当社が判断した場合
        </ListItem>
        <ListItem>法令に基づく場合</ListItem>
        <ListItem>
          お客様が本サービスの利用規約に違反し、弊社の権利、財産やサービス等を保護するために、個人情報を公開せざるをえないと判断するに足る十分な根拠がある場合
        </ListItem>
        <ListItem>
          人の生命、身体または財産の保護のために必要がある場合であって、本人の同意を得ることが困難である場合
        </ListItem>
        <ListItem>
          公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合であって、本人の同意を得ることが困難である場合
        </ListItem>
        <ListItem>
          国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合であって、本人の同意を得ることにより当該事務の遂行に支障を及ぼすおそれがある場合
        </ListItem>
        <ListItem>
          合併、会社分割、営業譲渡その他の事由によって個人情報の提供を含む弊社の事業の承継が行われる場合
        </ListItem>
      </UnorderedList>
    </Item>

    <Item>
      <Text as="h3" fontSize="lg">
        第6条（個人情報の開示）
      </Text>
      <OrderedList>
        <ListItem>
          <Text>
            当社は，本人から個人情報の開示を求められたときは，本人に対し，遅滞なくこれを開示します。ただし，開示することにより次のいずれかに該当する場合は，その全部または一部を開示しないこともあり，開示しない決定をした場合には，その旨を遅滞なく通知します。なお，個人情報の開示に際しては，1件あたり1，000円の手数料を申し受けます。
          </Text>
          <OrderedList>
            <ListItem>
              本人または第三者の生命，身体，財産その他の権利利益を害するおそれがある場合
            </ListItem>
            <ListItem>
              当社の業務の適正な実施に著しい支障を及ぼすおそれがある場合
            </ListItem>
            <ListItem>その他法令に違反することとなる場合</ListItem>
          </OrderedList>
        </ListItem>
        <ListItem>
          前項の定めにかかわらず，履歴情報および特性情報などの個人情報以外の情報については，原則として開示いたしません。
        </ListItem>
      </OrderedList>
    </Item>

    <Item>
      <Text as="h3" fontSize="lg">
        第7条（個人情報の利用停止等）
      </Text>
      <OrderedList>
        <ListItem>
          当社は，本人から，個人情報が，利用目的の範囲を超えて取り扱われているという理由，または不正の手段により取得されたものであるという理由により，その利用の停止または消去（以下，「利用停止等」といいます。）を求められた場合には，遅滞なく必要な調査を行います。
        </ListItem>
        <ListItem>
          前項の調査結果に基づき，その請求に応じる必要があると判断した場合には，遅滞なく，当該個人情報の利用停止等を行います。
        </ListItem>
        <ListItem>
          当社は，前項の規定に基づき利用停止等を行った場合，または利用停止等を行わない旨の決定をしたときは，遅滞なく，これをユーザーに通知します。
        </ListItem>
        <ListItem>
          前2項にかかわらず，利用停止等に多額の費用を有する場合その他利用停止等を行うことが困難な場合であって，ユーザーの権利利益を保護するために必要なこれに代わるべき措置をとれる場合は，この代替策を講じるものとします。
        </ListItem>
      </OrderedList>
    </Item>

    <Item>
      <Text as="h3" fontSize="lg">
        第8条（プライバシーポリシーの変更）
      </Text>
      <OrderedList>
        <ListItem>
          本ポリシーの内容は，法令その他本ポリシーに別段の定めのある事項を除いて，ユーザーに通知することなく，変更することができるものとします。
        </ListItem>
        <ListItem>
          当社が別途定める場合を除いて，変更後のプライバシーポリシーは，本ウェブサイトに掲載したときから効力を生じるものとします。
        </ListItem>
      </OrderedList>
    </Item>

    <Item>
      <Text as="h3" fontSize="lg">
        第9条（お問い合わせ窓口）
      </Text>
      <Text>
        本ポリシーに関するお問い合わせは，下記の窓口までお願いいたします。
      </Text>
      <Text> フォーム: XXX</Text>
      <Text textAlign="right">以上</Text>
    </Item>
  </Flex>
);

export default Page;
