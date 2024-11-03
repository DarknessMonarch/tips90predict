export default function manifest() {
    return {
      name: 'tips90prediction',
      short_name: 'tips90prediction',
      description: 'Welcome to Tips90predict, your go-to source for precise sports betting predictions. Our expertise lies in football, basketball, and tennis.',
      start_url: '/' || '/page/home',
      display: 'standalone',
      background_color: '#09122eff',
      theme_color: '#09122eff',
      icons: [
        {
          src: '/favicon.ico',
          sizes: 'any',
          type: 'image/x-icon',
        },
      ],
    }
  }