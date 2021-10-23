## 認証回りのフローについて

認証ユーザーを `AuthUser`
認証ユーザーの持つアプリケーション上のユーザーデータを `User`
とする。

- front で supabase 認証。`AuthUser` を取得。
  - authUser.uid から user を取得する
    - 取得できなかった場合(エラーではなく not found)
      - authUser の twitterId から user を検索する
        - authUser.twitterId == user.userId の user がいなかった場合
          - twitterId を使って勝手に user を作成
        - authUser.twitterId == user.userId の user が既にいた場合
          - user.userId を入力させる画面に誘導する
    - 取得できなかった場合(エラー... 通信とか？)
      - ブラウザをリロードさせる？ダメだったら時間を置いて...とか
    - 取得できた場合
      - authenticated!
