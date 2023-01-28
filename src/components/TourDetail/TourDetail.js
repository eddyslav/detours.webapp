import { Link } from 'react-router-dom';

import { useEffect, useRef } from 'react';

import { useSelector } from 'react-redux';

import { IonIcon } from '@ionic/react';
import {
  calendarOutline,
  mapOutline,
  peopleOutline,
  trendingUpOutline,
  starOutline,
} from 'ionicons/icons';

import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

import { getToursImg, getUsersImg } from '../../api/constants';

import classes from './TourDetail.module.css';

import PrimaryHeading from '../UI/Headings/PrimaryHeading';
import SecondaryHeading from '../UI/Headings/SecondaryHeading';

import logo from '../../resources/logo-white.png';

mapboxgl.accessToken =
  'pk.eyJ1IjoiZWRkeXNsYXYiLCJhIjoiY2tvdHU5dmZmMDBmbzJxazN2bjc1bDBhZyJ9.wFEw7zC7O_vFB4OY2deVmQ';

const TourDetail = ({ tour }) => {
  const auth = useSelector((state) => state.auth);

  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/eddyslav/ckotuehe616vx17lkudir0wrp',
      scrollZoom: false,
    });

    const bounds = new mapboxgl.LngLatBounds();

    tour.locations.forEach((loc) => {
      // Create marker
      const el = document.createElement('div');
      el.className = classes.marker;

      // Add marker
      new mapboxgl.Marker({
        element: el,
        anchor: 'bottom',
      })
        .setLngLat([loc.x, loc.y])
        .addTo(map.current);

      // Add popup
      new mapboxgl.Popup({
        offset: 30,
      })
        .setLngLat([loc.x, loc.y])
        .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
        .addTo(map.current);

      // Extend map bounds to include current location
      bounds.extend([loc.x, loc.y]);
    });

    map.current.fitBounds(bounds, {
      padding: {
        top: 200,
        bottom: 150,
        left: 100,
        right: 100,
      },
    });
  });

  return (
    <>
      <section className={classes['section-header']}>
        <div className={classes.header__hero}>
          <div className={classes['header__hero-overlay']}>&nbsp;</div>
          <img
            className={classes['header__hero-img']}
            src={getToursImg(tour.imageCover)}
            alt={tour.name}
          />
        </div>

        <div className={classes['heading-box']}>
          <PrimaryHeading>{tour.name}</PrimaryHeading>

          <div className={classes['heading-box__group']}>
            <div className={classes['heading-box__detail']}>
              <IonIcon
                className={classes['heading-box__icon']}
                icon={calendarOutline}
              />

              <span className={classes['heading-box__text']}>
                {tour.duration} days
              </span>
            </div>

            <div className={classes['heading-box__detail']}>
              <IonIcon
                className={classes['heading-box__icon']}
                icon={mapOutline}
              />

              <span className={classes['heading-box__text']}>
                {tour.startLocation.description}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className={classes['section-description']}>
        <div className={classes['overview-box']}>
          <div>
            <div className={classes['overview-box__group']}>
              <SecondaryHeading>Quick facts</SecondaryHeading>

              <div className={classes['overview-box__detail']}>
                <IonIcon
                  className={classes['overview-box__icon']}
                  icon={calendarOutline}
                />

                <span className={classes['overview-box__label']}>
                  Next date
                </span>
                <span className={classes['overview-box__text']}>
                  {new Date(tour.startDate).toLocaleString('en-us', {
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
              </div>

              <div className={classes['overview-box__detail']}>
                <IonIcon
                  className={classes['overview-box__icon']}
                  icon={trendingUpOutline}
                />

                <span className={classes['overview-box__label']}>
                  Difficulty
                </span>
                <span className={classes['overview-box__text']}>
                  {tour.difficulty}
                </span>
              </div>

              <div className={classes['overview-box__detail']}>
                <IonIcon
                  className={classes['overview-box__icon']}
                  icon={peopleOutline}
                />

                <span className={classes['overview-box__label']}>
                  Participants
                </span>
                <span className={classes['overview-box__text']}>
                  {tour.maxGroupSize} people
                </span>
              </div>

              <div className={classes['overview-box__detail']}>
                <IonIcon
                  className={classes['overview-box__icon']}
                  icon={starOutline}
                />

                <span className={classes['overview-box__label']}>Rating</span>
                <span className={classes['overview-box__text']}>
                  {tour.ratingsAverage} / 5
                </span>
              </div>
            </div>

            <div className={classes['overview-box__group']}>
              <SecondaryHeading>Your tour guides</SecondaryHeading>

              {tour.guides.map((x, i) => (
                <div key={i} className={classes['overview-box__detail']}>
                  <img
                    className={classes['overview-box__img']}
                    src={getUsersImg(x.photo)}
                    alt={x.name}
                  />

                  <span className={classes['overview-box__label']}>
                    {x.role === 'leadGuide' ? 'Lead guide' : 'Guide'}
                  </span>

                  <span className={classes['overview-box__text']}>
                    {x.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={classes['description-box']}>
          <SecondaryHeading>About {tour.name} tour</SecondaryHeading>

          {tour.description.split('\n').map((x, i) => (
            <p
              key={`description-line-${i}`}
              className={classes.description__text}
            >
              {x}
            </p>
          ))}
        </div>
      </section>

      <section className={classes['section-pictures']}>
        {tour.images.map((x, i) => (
          <div key={`tour-image-${i}`} className={classes['picture-box']}>
            <img
              className={`${classes['picture-box__img']} ${
                classes[`picture-box__img--${i + 1}`]
              }`}
              src={getToursImg(x)}
              alt={`${tour.name} ${i + 1}`}
            />
          </div>
        ))}
      </section>

      <section className={classes['section-map']}>
        <div className={classes.map} ref={mapContainer}></div>
      </section>

      <section className={classes['section-cta']}>
        <div className={classes.cta}>
          <div
            className={`${classes['cta__img']} ${classes['cta__img--logo']}`}
          >
            <img src={logo} alt='Detours logo' />
          </div>

          <img
            className={`${classes['cta__img']} ${classes['cta__img--1']}`}
            src={getToursImg(tour.images[1])}
            alt='Tour'
          />

          <img
            className={`${classes['cta__img']} ${classes['cta__img--2']}`}
            src={getToursImg(tour.images[2])}
            alt='Tour'
          />

          <div className={classes.cta__content}>
            <SecondaryHeading>What are you waiting for?</SecondaryHeading>

            <p className={classes.cta__text}>
              {tour.duration} days. 1 adventure. Infinite memories. Make it
              yours today!
            </p>

            {auth.isAuthenticated && (
              <Link
                className={classes.btn}
                to={`/booking/${tour.id}`}
                state={{ tour }}
              >
                Book tour now!
              </Link>
            )}

            {!auth.isAuthenticated && (
              <Link to='/login' className={classes.btn}>
                Log in to book tour
              </Link>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default TourDetail;
