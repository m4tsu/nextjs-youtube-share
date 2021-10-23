export const Paths = {
  posts: '/[user_name]',
  post: '/[user_name]/posts/[post_id]',
  newPost: '/[user_name]/posts/new',
  mylist: '/[user_name]/mylist',
  favorites: '/[user_name]/favorites',
  following: '/[user_name]/following',
  followers: '/[user_name]/followers',
  searchUsers: '/search',
  top: '/',
  home: '/home',
  login: '/login',
} as const;
