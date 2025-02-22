import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { clearItems } from '../../store/selectedItemsSlice';
import './Flyout.css';
import { Film } from '../../helpers/film.model.ts';
import Button from '../Button/Button.tsx';

const Flyout: React.FC = () => {
  const selectedItems: Film[] = useSelector(
    (state: RootState) => state.selectedItemsReducer.selectedItems
  );
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(true);

  useEffect((): void => {
    setIsVisible(selectedItems?.length !== 0);
    console.log('selectedItems', selectedItems);
  }, [selectedItems]);

  const handleUnselectAll = (): void => {
    dispatch(clearItems());
  };

  const handleDownload = (): void => {
    if (selectedItems?.length === 0) {
      return;
    }

    const header = 'Title,Episode,URL\n';
    const csvContent = header.concat(
      selectedItems
        .map((item: Film) => `${item.title},${item.episode_id},${item.url}`)
        .join('\n')
    );
    const blob: Blob = new Blob([csvContent], { type: 'text/csv' });
    const url: string = URL.createObjectURL(blob);
    const a: HTMLAnchorElement = document.createElement('a');
    a.href = url;
    a.download = `${selectedItems.length}_episodes.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <>
      {' '}
      {isVisible && (
        <section className="flyout-backdrop">
          <div className="flyout">
            <div className="flyout-title">
              <h3>Selection notification</h3>
              <button className="flyout-close" onClick={handleClose}>
                X
              </button>
            </div>
            <span>{selectedItems.length} items selected</span>
            <div className={'flyout-buttons'}>
              <Button
                onButtonClick={handleUnselectAll}
                text={'Unselect All'}
              ></Button>
              <Button onButtonClick={handleDownload} text={'Download'}></Button>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Flyout;
