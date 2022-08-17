import React, { useEffect } from 'react'
import { Banner } from '../../templates/HomeTemplate/Banner';
import { useDispatch, useSelector } from 'react-redux'
import { actFectDataCity } from './reducer/actions';
import ClipLoader from "react-spinners/ClipLoader";
export const Home = () => {
  let dispatch = useDispatch();
  // let prop = []
  let prop = useSelector((state) => state.dataCiTyReducer);
  useEffect(() => {
    dispatch(actFectDataCity())
  },[])

  let { data, loading } = prop;
  const renderHtmlCiTy = () => {
    if (loading) return <ClipLoader className='text-red-400' color="#ef7983" />
    return data?.splice(0,8).map((city, index) => {
      return <div key={index} className='col l-3 mf8-6 c-12'>
        <div className='all__city flex items-center cursor-pointer rounded-md hover:scale-105 hover:bg-gray-100 m-2 transition-all ease-linear'>
          <div className='mr-2 img__city'>
            <img className='rounded w-10 h-10' src={city.image} />
          </div>
          <div className='text__city'>
            <h4 className='font-bold'>{city.province}</h4>
            <span className='text-gray-500'>{city.valueate} giờ lái xe</span>
          </div>
        </div>
      </div>
    })
  }
  return (
    <>
      {/* <Header /> */}
      <Banner />
      <>
        <section>
          <div className='grid wide'>
            <h1 className='text-3xl font-semibold pb-5 pt-5 text__main ml-2'>Khám phá những điểm đến gần đây</h1>
          </div>
          <div className='grid wide'>
            <div className='row'>
              {renderHtmlCiTy()}
            </div>
          </div>
        </section>
        <section className='mb-5'>
          <div className='grid wide'>
            <h1 className='text-3xl font-semibold pb-5 pt-5 text__main ml-2'>Ở bất cứ đâu</h1>
          </div>
          <div className='grid wide'>
            <div className='row '>
              <div className='col l-3 mf8-6 c-12'>
                <div className='where hover:scale-105 transition-all ease-linear'>
                  <div className='where__img '>
                    <img className='rounded-md' src='https://a0.muscache.com/im/pictures/2f13349d-879d-43c6-83e3-8e5679291d53.jpg?im_w=1440' />
                  </div>
                  <div className='where__text'>
                    <p className='font-bold mt-1'>Toàn bộ nhà</p>
                  </div>
                </div>
              </div>
              <div className='col l-3 mf8-6 c-12'>
                <div className='where hover:scale-105 transition-all ease-linear'>
                  <div className='where__img'>
                    <img className='rounded-md' src='https://a0.muscache.com/im/pictures/36f53e61-db8d-403c-9122-5b761c0e4264.jpg?im_w=1440' />
                  </div>
                  <div className='where__text'>
                    <p className='font-bold mt-1'>Chỗ ở độc đáo</p>
                  </div>
                </div>
              </div>
              <div className='col l-3 mf8-6 c-12'>
                <div className='where hover:scale-105 transition-all ease-linear'>
                  <div className='where__img'>
                    <img className='rounded-md' src='https://a0.muscache.com/im/pictures/7d82ca14-56e5-4465-8218-dcfa7d69b6ac.jpg?im_w=1440' />
                  </div>
                  <div className='where__text'>
                    <p className='font-bold mt-1'>Trang trại và thiên nhiên</p>
                  </div>
                </div>
              </div>
              <div className='col l-3 mf8-6 c-12'>
                <div className='where hover:scale-105 transition-all ease-linear'>
                  <div className='where__img'>
                    <img className='rounded-md' src='https://a0.muscache.com/im/pictures/10a638e1-6aff-4313-8033-1275cec83987.jpg?im_w=1440' />
                  </div>
                  <div className='where__text'>
                    <p className='font-bold mt-1'>Cho phép mang theo thú cưng</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    </>
  )
}
