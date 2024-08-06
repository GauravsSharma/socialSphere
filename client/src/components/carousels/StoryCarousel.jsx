import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

export default function App({ story }) {

  return (
    <div className="h-full w-full relative">
      <div className='h-[10%]  px-5 flex justify-start items-center w-full absolute z-10 cursor-pointer'>
        <img src={story?.owner.avatar.url} alt="" className='h-12 w-12 object-cover rounded-full border-2 ' />
        <p className='text-md text-white ml-2 hover:underline'>{story?.owner.name}</p>
      </div>
      <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
        {
          story && story.images.map((image) => (
            <SwiperSlide className='swiper-slide'>
              <img src={image.url} alt="" className='h-full w-full object-cover' />
            </SwiperSlide>
          ))
        }
      </Swiper>
    </div>

  );
}
