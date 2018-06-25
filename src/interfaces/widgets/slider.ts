import { Settings as SlickSettings } from 'react-slick';
import { Article } from '../../interfaces';

export interface NewsSliderProps {
  type?: string;
  start?: number;
  end?: number;
  settings?: SlickSettings;
}

export interface SliderTemplatesProps extends NewsSliderProps {
  news: Article[]
}