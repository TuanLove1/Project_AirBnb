import React, { useEffect } from 'react'
import { Banner } from '../../templates/HomeTemplate/Banner';
import { useDispatch, useSelector } from 'react-redux'
import { actFectDataCity } from './reducer/actions';
import ClipLoader from "react-spinners/ClipLoader";
import SlickCarousel from "../../components/SlickCarousel/SlickeCarousel"
export const Home = () => {
  let dispatch = useDispatch();
  // let prop = []
  let prop = useSelector((state) => state.dataCiTyReducer);
  useEffect(() => {
    dispatch(actFectDataCity())
  }, [])

  let { data, loading } = prop;

  return (
    <>
      {loading ? <div style={{ backgroundColor: 'rgba(0,0,0,.5)', height: '100%', width: '100%', position: 'fixed', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: '999' }} className=''>
        <ClipLoader color='rgb(248 113 113)' />
      </div> : ''}
      {/* <Header /> */}
      <Banner />
      <>

        <section>
          <div className='grid wide'>
            <h1 className='text-3xl font-semibold pb-5 pt-5 text__main ml-2'>Khám phá những điểm đến gần đây</h1>
          </div>
          <div className='grid wide'>
            <div className='row'>
              {loading ? <ClipLoader color='rgb(248 113 113)' /> : <SlickCarousel data={data} loading={loading} />}
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
