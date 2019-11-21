import Button from '@material-ui/core/Button';
import React from 'react';
import BaseComponent from '../lib/BaseComponent';

class CyberBoost extends BaseComponent {
  constructor(...args) {
    super(...args);

    this.state = {
      stableVersion: '',
      nightlyVersion: '',
    };
  }

  componentDidMount() {
    this.context.setTitle('CyberBoost');

    window.fetch('https://bucket-1251032844.cos.ap-shanghai.myqcloud.com/cyberboost/STABLE')
      .then(res => res.text())
      .then(text => this.setState({
        stableVersion: text.trim(),
      }));

    window.fetch('https://bucket-1251032844.cos.ap-shanghai.myqcloud.com/cyberboost/NIGHTLY')
      .then(res => res.text())
      .then(text => this.setState({
        nightlyVersion: text.trim(),
      }));
  }

  render() {
    const {
      stableVersion,
      nightlyVersion,
    } = this.state;

    return (
      <>
        <div style={{
          marginTop: 64,
          padding: 16,
          display: 'flex',
          flexWrap: 'wrap',
        }}>
          <Button
            className="button"
            variant="contained"
            size="large"
            color="primary"
            onClick={() => window.open(`https://bucket-1251032844.cos.ap-shanghai.myqcloud.com/cyberboost/cyberboost-${stableVersion}-windows.zip`)}
          >
            Stable Version:
            <br />
            {stableVersion}
          </Button>
          <Button
            className="button"
            variant="contained"
            size="large"
            color="secondary"
            onClick={() => window.open(`https://bucket-1251032844.cos.ap-shanghai.myqcloud.com/cyberboost/cyberboost-${nightlyVersion}-windows.zip`)}
          >
            Nightly Version:
            <br />
            {nightlyVersion}
          </Button>
        </div>

        <style jsx>{`
        :global(.button) {
          margin: 8px;
          min-width: 240px;
          flex: 1;
        }
        `}</style>
      </>
    );
  }
}

export default CyberBoost;
