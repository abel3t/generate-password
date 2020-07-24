import React from 'react'

declare global {
  interface Window {
    adsbygoogle: any
  }
}

class GoogleAds extends React.Component<any, any> {
  componentDidMount() {
    if(window) (window.adsbygoogle = window.adsbygoogle || []).push({});
  }
  render() {
    return (
      <ins className={`${this.props.className} adsbygoogle`}
        style={this.props.style}
        data-ad-client={this.props.client}
        data-ad-slot={this.props.slot}
        data-ad-layout={this.props.layout}
        data-ad-format={this.props.format}
        data-full-width-responsive={this.props.responsive}
      />
    )
  }
}

export default GoogleAds