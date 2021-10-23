export type User = {
  displayName: string;
  photoURL: string;
  screenName: string;
  uid: string;
  following: User[];
  followers: User[];
};

export const dummyUser: User = {
  photoURL:
    'https://pbs.twimg.com/profile_images/891975571680264192/tJ1eBPZf_normal.jpg',
  displayName: 'twitter_id',
  screenName: 'ユーザー名',
  uid: '1122334455',
  following: [
    {
      photoURL:
        'https://pbs.twimg.com/profile_images/891975571680264192/tJ1eBPZf_normal.jpg',
      displayName: 'twitter_idB',
      screenName: 'ユーザー名B',
      uid: '1122334466',
      followers: [],
      following: [],
    },
  ],
  followers: [
    {
      photoURL:
        'https://pbs.twimg.com/profile_images/891975571680264192/tJ1eBPZf_normal.jpg',
      displayName: 'twitter_idB',
      screenName: 'ユーザー名B',
      uid: '1122334466',
      followers: [],
      following: [],
    },
  ],
};
