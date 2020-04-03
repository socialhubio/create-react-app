import React from 'react';
import styled from 'styled-components';
import { translate } from 'react-i18next';

const Something = styled.div`
  margin-top: 100px;
`;
function SimpleModule(props){
  const { t } = props;
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/modules/router.js</code> and save to reload.
          </p>
          <Something>
            {t('hello')}
          </Something>
      </header>
    </div>
  );
}

export default translate()(SimpleModule);
