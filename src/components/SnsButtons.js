import React, { Component } from 'react';
import { Hashtag, Tweet, Share } from 'react-twitter-widgets'

export default class SnsButtons extends Component {

    render() {

        const styles = {
            wrap: {
                margin: 10
            }
        }

        const { palette } = this.props.image;

        let query = "?";
        for (let i = 0; i < palette.length; i++) {
            query += "c[" + i + "]=" + palette[i].slice(1) + "&";
        }
        query = query.slice(0, -1);
        
        return (
            <div style={styles.wrap}>
                <div>使った色をつぶやく</div>
                {/*<a 
                    ref="tweetButton"
                    href="https://twitter.com/intent/tweet?button_hashtag=カラーパレットこんばーた&ref_src=twsrc%5Etfw" 
                    class="twitter-hashtag-button" 
                    data-size="large" 
                    data-text={"使ったカラーパレット http://colorpalette-converter.s3-website.us-east-2.amazonaws.com/index.html" + query} 
                    data-show-count="false"
                >
                    Tweet #カラーパレットこんばーた
                </a>*/}
                <Hashtag
                    hashtag="カラーパレットこんばーた"
                    url={"http://colorpalette-converter.s3-website.us-east-2.amazonaws.com/index.html"+query}
                    options={{size:"large",text:"カラーパレットこんばーた(β) http://colorpalette-converter.s3-website.us-east-2.amazonaws.com"}}
                />
            </div>
        );
    }
}