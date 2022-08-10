import React from 'react'

export const Footer = () => {
  return (
    <>
      <div className='home__footer bg-slate-200 p-3 pt-5 mt-5'>
        <div className='grid wide'>
          <div className='row'>
            <div className='col l-3 mf8-6 c-12'>
              <div className='about space-y-2 mb-2'>
                <h1 className='font-bold mb-3 cursor-pointer'>GIỚI THIỆU</h1>
                <p>Phương thức  hoạt động của Airbnb</p>
                <p>Trang tin tức</p>
                <p>Nhà đầu tư</p>
                <p>Airbnb Plus</p>
                <p>Airbnb Luxe</p>
              </div>
            </div>
            <div className='col l-3 mf8-6 c-12'>
              <div className='congDong space-y-2 mb-2'>
                <h1 className='font-bold mb-3 cursor-pointer'>CỘNG ĐỒNG</h1>
                <p>Sự đa dạng và cảm giác thân thuộc</p>
                <p>Tiện nghi phù hợp cho người khuyết tật</p>
                <p>Đối tác liên kết Airbnb</p>
                <p>Chỗ ở cho tuyến đầu</p>
                <p>Lượt giới thiệu của khách</p>
              </div>
            </div>
            <div className='col l-3 mf8-6 c-12'>
              <div className='donTiepKhach space-y-2 mb-2'>
                <h1 className='font-bold mb-3 cursor-pointer'>ĐÓN TIẾP KHÁCH</h1>
                <p>Cho thuê nhà</p>
                <p>Tổ chức trải nghiệm trực tuyến</p>
                <p>Đón tiếp khách có trách nhiệm</p>
                <p>Trung tâm tài nguyên</p>
                <p>Trung tâm cộng đồng</p>
              </div>
            </div>
            <div className='col l-3 mf8-6 c-12'>
              <div className='support space-y-2'>
                <h1 className='font-bold mb-3 cursor-pointer'>HỖ TRỢ</h1>
                <p>Biện pháp ứng phó với đại dịch covid của chúng tôi</p>
                <p>Trung tâm trợ giúp</p>
                <p>Các tùy chọn hủy</p>
                <p>Hỗ trợ khu dân cư</p>
                <p>Tin cậy và an toàn</p>
              </div>
            </div>
          </div>
        </div>
        <hr/>
        <div className='grid wide'>
          <div className='row'>
            <div className='col l-12 mf-12 c-12 text-center my-3'>
             &copy; Copyright 2022 by Nguyễn Hữu Tuấn
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
