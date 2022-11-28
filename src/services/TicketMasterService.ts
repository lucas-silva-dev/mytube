import axios from 'axios';
import { toast } from 'react-toastify';

import { CarouselProps } from '../@types';

interface TKProps {
  data: {
    _embedded: {
      attractions: CarouselProps[]
    },
    page: {
      totalElements: number;
    }
  }
}

interface ListAttractionProps {
  attractions: CarouselProps[];
  youtube: {
    url: string;
  }[];

   spotify: {
    url: string;
  }[];
}



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

export const TicketMasterService = {
  listAttraction: async (searchTerm: string) => {
    const { data }: TKProps = await axios.get(`https://app.ticketmaster.com/discovery/v2/attractions.json?keyword=${searchTerm}&size=10&apikey=${process.env.REACT_APP_TICKET_MASTER_KEY}`);

    if(data.page.totalElements === 0) {
      notify("Enter a valid band or artist!")
      return {} as ListAttractionProps;
    }

    const attractions = data._embedded.attractions.map(attraction => {
      return {
        id: attraction.id,
        images: attraction.images.filter((img) => {
          return img.width === 640 && img.height === 360
        })
      }
    })

    const [attraction] = data._embedded.attractions.filter(attraction => attraction.externalLinks?.youtube);

      const youtube = attraction.externalLinks?.youtube || [{ url: '' }]
      const spotify = attraction.externalLinks?.spotify || [{ url: '' }]

    return { attractions, youtube, spotify };
  }
}

