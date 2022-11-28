import axios from 'axios';

interface YouTubeDataProps {
  id: {
    videoId:string
  },
  snippet: {
    title: string;
    videoTitle: string,
    description: string,
    channelId: string,
    channelTitle: string,
    publishedAt: string,
    thumbnails: {
      medium: {
        height: number,
        url: string,
        width: number
      }
    }
  }
}

export const YouTubeService = {
  listVideos: async (searchTerm: string) => {
    const { data: videoData } = await axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${searchTerm}&key=${process.env.REACT_APP_YOUTUBE_KEY}`)

    const items: YouTubeDataProps[] = videoData.items

    const videos = items.map(video => {
      return {
        id: video.id.videoId,
        videoTitle: video.snippet.title,
        description: video.snippet.description,
        channelId: video.snippet.channelId,
        channelTitle: video.snippet.channelTitle,
        publishedAt: video.snippet.publishedAt,
        thumbnail: {
          height: video.snippet.thumbnails.medium.height,
          url: video.snippet.thumbnails.medium.url,
          width: video.snippet.thumbnails.medium.width
        }
      }
    })

    return videos;
  }
}
