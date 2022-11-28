import React, { useCallback, useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';

import { Form } from '../Form';
import { VideoList } from '../VideoList';
import { Carousel } from '../Carousel';
import Loader from '../Loader';

import { TicketMasterService } from '../../services/TicketMasterService';
import { YouTubeService } from '../../services/YouTubeService';

import spotifyIcon from '../../assets/images/spotify.svg'
import youtubeIcon from '../../assets/images/youtube.svg'

import { VideoProps } from '../VideoList/index'

import { CarouselProps, SocialProps } from '../../@types';

import 'react-toastify/dist/ReactToastify.css';
import styles from './styles.module.scss';

function App() {
  const [json, setJson] = useState<VideoProps[]>([]);
  const [carousel, setCarousel] = useState<CarouselProps[]>([]);
  const [social, setSocial] = useState({} as SocialProps);
  const [isLoading, setIsLoading] = useState(false);

  const notify = (message: string) => toast.error(message, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

  const isCentralized = json.length > 0;

  const handleSubmit = useCallback(async (formData: string) => {
    setIsLoading(true);

    try {
      const urlSearchParam = encodeURI(formData);

      if(urlSearchParam === '') {
        notify("This field can't be void");
        return;
      }

      const { attractions, youtube, spotify } = await TicketMasterService.listAttraction(urlSearchParam);

      if(!attractions) {
        return;
      }

      const videos = await YouTubeService.listVideos(urlSearchParam);

      setSocial({ youtube, spotify });
      setCarousel(attractions);
      setJson(videos);
    } catch {
      notify("Error at search, try again!");
    } finally {
      setIsLoading(false);
    }
  }, []);


  return (
    <main className={`${styles.app} ${isCentralized ? styles.top : ''}`}>
      <Loader isLoading={isLoading} />

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <Form onSubmit={handleSubmit} />

      <section>
        <header className={`${styles.social} ${isCentralized ? styles.visible : ''}`}>
          {
            Object.keys(social).length > 0 && (
              <ul>
                <li>
                  <a href={social.youtube[0].url}>
                    <img src={youtubeIcon} alt="youtube icon" />
                  </a>
                </li>
                <li>
                  <a href={social.spotify[0].url}>
                    <img src={spotifyIcon} alt="spotify icon" />
                  </a>
                </li>
              </ul>
            )
          }
        </header>

        <div className={styles.swiper}>
          <Carousel images={carousel} />
        </div>
      </section>

      <VideoList videos={json} />

    </main>
  );
}

export default App;
