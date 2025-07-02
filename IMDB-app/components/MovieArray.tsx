import { MovieShow, NotificationItem  } from '@/types/Types';

const moviesShows: MovieShow[] = [
    {
      id: '1',
      title: 'Money Heist',
      image: 'https://images-cdn.ubuy.co.in/635006c5268218559911b466-money-heist-la-casa-de-papel-part-4.jpg',
    },
    {
      id: '2',
      title: 'Game of Thrones',
      image: 'https://c4.wallpaperflare.com/wallpaper/115/674/429/throne-game-of-thrones-sean-bean-eddard-ned-stark-tv-posters-george-r-r-martin-song-of-ice-and-f-nature-winter-hd-art-wallpaper-preview.jpg',
    },
    {
      id: '3',
      title: 'The Dark Knight',
      image: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_FMjpg_UX1000_.jpg',
    },
    {
      id: '4',
      title: 'Sherlock',
      image: 'https://i.pinimg.com/736x/bb/d8/46/bbd846edb6ab2b3f252567cb6b257ad6.jpg',
    },
    {
      id: '5',
      title: "The Boys",
      image: 'https://cdnb.artstation.com/p/assets/images/images/031/128/313/large/mayank-kumarr-2.jpg?1602685224',
    },
    {
      id: '6',
      title: 'The Shark Tank',
      image: 'https://qph.cf2.quoracdn.net/main-qimg-0cbe18cdabc9cab371089a18442a38b2-lq',
    },
  ];


  const notifications: NotificationItem[] = [
    {
      id: '1',
      title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      timeAgo: '1min ago',
      image: 'https://akns-images.eonline.com/eol_images/Entire_Site/20191019/rs_634x941-191119145917-634-Jumanji-Next-Level-CE-111919.jpg?fit=around%7C776:1152&output-quality=90&crop=776:1152;center,top',
      iconType: 'video',
    },
    {
      id: '2',
      title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      timeAgo: '1min ago',
      image: 'https://www.tallengestore.com/cdn/shop/products/JohnWick-KeanuReeves-HollywoodEnglishActionMoviePoster-2_1eac59c5-8747-4ce2-937b-4b916be044cc.jpg?v=1649071607',
      iconType: 'image',
    },
    {
      id: '3',
      title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      timeAgo: '1min ago',
      image: 'https://qqcdnpictest.mxplay.com/pic/bce7ae02445dad432bdab581e180ceef/en/2x3/312x468/d5f863cd13cc307123989701f8b72fdf_1280x1920.webp',
      iconType: 'file',
    },
    {
      id: '4',
      title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      timeAgo: '1min ago',
      image: 'https://photogallery.indiatimes.com/movies/international/maleficent/photo/35618380/Poster-of-Hollywood-dark-fantasy-adventure-film-Maleficent-starring-Angelina-Jolie-.jpg',
      iconType: 'clock',
    },
    {
      id: '5',
      title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      timeAgo: '1min ago',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1eMB1HN8ut1txQhRvTs1jJ0nCdcgQG43WXg&s',
      iconType: 'heart',
    },
    {
      id: '6',
      title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      timeAgo: '1min ago',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNHbiynGddWiwSXEmfcjw1vlNdyE0zjYIMfQ&s',
      iconType: 'video',
    },
  ];





  export {moviesShows, notifications};