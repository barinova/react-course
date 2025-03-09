import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { clearItems } from '@store/selectedItemsSlice';
import './Flyout.css';
import { useTheme } from '@components/ThemeSwitcher/ThemeContext';
import { Film } from '../../helpers/film.model';
import Button from '@components/Button/Button';

const Flyout: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [link, setLink] = useState('');
  const [fileName, setFileName] = useState('');
  const { isDarkTheme } = useTheme();
  const downloadRef = useRef<HTMLAnchorElement>(null);

  const selectedItems: Film[] = useSelector(
    (state: RootState) => state.selectedItemsReducer.selectedItems
  );
  const dispatch = useDispatch();

  useEffect((): void => {
    setIsVisible(selectedItems?.length !== 0);
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
    setLink(URL.createObjectURL(blob));
    setFileName(`${selectedItems.length}_episodes.csv`);
    setTimeout(() => downloadRef.current?.click());
  };

  return (
    <>
      {' '}
      {isVisible && (
        <section
          className={`flyout-backdrop ${isDarkTheme ? 'flyout-dark' : 'flyout-light'}`}
        >
          <div className="flyout">
            <div>
              <div className="flyout-title">
                <h3>Selection notification</h3>
              </div>
              <span>
                {selectedItems.length} item
                {selectedItems.length === 1 ? '' : 's'} selected
              </span>
            </div>
            <div className={'flyout-buttons'}>
              <Button
                onButtonClick={handleUnselectAll}
                text={'Unselect All'}
                small={true}
              ></Button>
              <Button
                onButtonClick={handleDownload}
                text={'Download'}
                small={true}
              ></Button>
              <a
                className="d-none"
                href={link}
                download={fileName}
                ref={downloadRef}
                aria-hidden="true"
                role="link"
              ></a>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Flyout;
