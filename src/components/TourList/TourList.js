import { Link, useSearchParams } from 'react-router-dom';

import { IonIcon } from '@ionic/react';
import {
  flagOutline,
  peopleOutline,
  calendarOutline,
  pinOutline,
} from 'ionicons/icons';

import { getToursImg } from '../../api/constants';

import classes from './TourList.module.css';
import { showMessage } from "../../utils";
import { useEffect } from "react";

const TourCard = ({
  slug,
  name,
  imageCover,
  summary,
  startDate,
  ratingsAverage,
  ratingsCount,
  maxGroupSize,
  price,
  locationsCount,
  difficulty,
  startLocation,
}) => {
  return (
    <div className={classes.tour}>
      <div className={classes['tour-header']}>
        <img
          className={classes['tour-img']}
          src={getToursImg(imageCover)}
          alt={`Cover of ${name}`}
        />
      </div>

      <div className={classes['tour-content']}>
        <div className={classes['tour-difficulty']}>
          <span
            className={`${classes.difficulty} ${
              classes['difficulty--' + difficulty]
            }`}
          >
            {difficulty}
          </span>
        </div>

        <p className={classes['tour-name']}>{name}</p>

        <p className={classes['tour-summary']}>{summary}</p>

        <div className={classes['tour-attributes']}>
          <div className={classes['tour-attribute']}>
            <IonIcon className={classes['tour-icon']} icon={pinOutline} />
            <span>{startLocation}</span>
          </div>

          <div className={classes['tour-attribute']}>
            <IonIcon className={classes['tour-icon']} icon={calendarOutline} />
            <span>
              {new Date(startDate).toLocaleString('en-us', {
                month: 'long',
                year: 'numeric',
              })}
            </span>
          </div>

          <div className={classes['tour-attribute']}>
            <IonIcon className={classes['tour-icon']} icon={flagOutline} />
            <span>{locationsCount} stops</span>
          </div>

          <div className={classes['tour-attribute']}>
            <IonIcon className={classes['tour-icon']} icon={peopleOutline} />
            <span>{maxGroupSize} people</span>
          </div>
        </div>
      </div>

      <div className={classes['tour-footer']}>
        <p>
          <span className={classes['tour-footer__value']}>${price}</span>
          <span className={classes['tour-footer__text']}> per person</span>
        </p>

        <p className={classes['tour-footer__ratings']}>
          <span className={classes['tour-footer__value']}>
            {Number(ratingsAverage).toFixed(1)}
          </span>
          <span className={classes['tour-footer__text']}>
            {' '}
            rating ({ratingsCount})
          </span>
        </p>

        <Link className={classes['tour-footer__btn']} to={`/${slug}`}>
          Details
        </Link>
      </div>
    </div>
  );
};

const TourList = ({ tours }) => {
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const alert = searchParams.get('alert');
    if (alert) {
      showMessage({
        id: 'booking-completed',
        title: 'Booking completed!',
        message: 'Thank you for booking a tour with us! You will receive a confirmation email about you booking shortly.',
        type: 'success',
      })
    }
  });

  return (
    <div className='container grid grid--3-cols margin-bottom-md'>
      {tours.map((x) => (
        <TourCard key={x.slug} {...x} />
      ))}
    </div>
  );
}

export default TourList;
