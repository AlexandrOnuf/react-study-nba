import * as React from 'react';
import { Link } from 'react-router-dom';
import Slick, { Settings as SlickSettings } from 'react-slick';
import { SliderTemplatesProps } from '../../../interfaces';
import './slider.css';


const SliderTemplates = (props: SliderTemplatesProps) => {
  let template:  JSX.Element[] | null = null;

  const settings: SlickSettings = {
    arrows: false,
    dots: true,
    infinite: true,
    slidesToScroll: 1,
    slidesToShow: 1,
    speed: 500,
    ...props.settings
  }

  switch(props.type) {
    // Если нам нужен новый template - нужно добавить новый `case`
    case('featured'):
      template = props.news.map( (item, i) => {
        return (
          <div key={i}>
            <div className='featured_item'>
              <div className='featured_image'
                style={{
                  background: `url(../../images/articles/${item.image})`
                }}
              />
              <Link to={`/articles/${item.id}`}>
                <div className='featured_caption'>
                  {item.title}
                </div>
              </Link>
            </div>
          </div>
        )
      });
      break;
    default:
      template = null;
  }

  return (
    <Slick {...settings}>
      {template}
    </Slick>
  );
}

export default SliderTemplates;
