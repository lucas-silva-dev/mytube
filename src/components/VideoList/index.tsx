/* eslint-disable no-restricted-globals */
import React from "react"

import calendar from '../../assets/images/calendar.svg';

import styles from './styles.module.scss';

export type VideoProps = {
  id: string,
  videoTitle: string,
  description: string,
  channelId: string,
  channelTitle: string,
  publishedAt: string,
  thumbnail: {
    height: number,
    url: string,
    width: number
  }
}

interface YouTubeDataProps {
  videos: VideoProps[]
}

export function VideoList({ videos }: YouTubeDataProps) {

  function formatDate(date: string) {
    const formattedDate = new Date(date);

    return formattedDate.toLocaleDateString();
  }

  return (
    <>

      <ul className={styles.wrapper}>
        {
          videos.map(video => (
            <li
              key={video.videoTitle}
            >
              <figure>
                <a
                  href={`https://www.youtube.com/watch?v=${video.id}`}
                  target='_blank' rel="noreferrer"
                  className={styles.ancor}
                >
                  <img src={video.thumbnail.url} alt={video.videoTitle} />
                </a>
                <figcaption>
                  <a
                    href={`https://www.youtube.com/watch?v=${video.id}`}
                    target='_blank' rel="noreferrer"
                    className={styles.ancor}
                  >
                    <strong>{video.videoTitle}</strong>
                    <small>
                      <img src={calendar} alt='date icon' />
                      {formatDate(video.publishedAt)}
                    </small>

                    <p>{video.description}</p>
                  </a>

                  <a
                    href={`https://www.youtube.com/channel/${video.channelId}`}
                    target="_blank" rel="noopener noreferrer"
                    id={video.channelId}
                  >
                    {video.channelTitle}
                  </a>
                </figcaption>
              </figure>
            </li>
          ))
        }
      </ul>
    </>
  )
}
