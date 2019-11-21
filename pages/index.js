import Typography from '@material-ui/core/Typography';
import React from 'react';
import BaseComponent from '../lib/BaseComponent';

class Home extends BaseComponent {
  componentDidMount() {
    this.context.setTitle('Home');
  }

  render() {
    return (
      <>
        <div style={{
          marginTop: 64,
          padding: 16,
        }}>
          <Typography>
            Hello world!
          </Typography>
        </div>

        <style jsx>{`

        `}</style>
      </>
    );
  }
}

export default Home;
