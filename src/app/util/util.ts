import { Params } from '@angular/router';
import { MD5 } from 'crypto-js';
import { Auth } from 'app/models/auth.model';
import { Photo } from 'app/models/photos.model';
import { CONSUMER_SECRET, CONSUMER_KEY } from "app/keys";

// constructs the params as a long string programmatically instead of typing it out
export const parseParams = (params: Params): string => {
    let requestParams: string = ''
    for (let key in params) {
        requestParams += `${key}=${params[key]}&`
    }
    return requestParams;
}

export const generateSig = (args: string[]): string => {
    // base string: secret + 'api_key' + consumer key + 'perms' + permissions requestes
    const baseString = CONSUMER_SECRET + ['api_key' + CONSUMER_KEY, ...args]
      // You create the signature string by joining the shared 
      // secret to the list of arguments in alphabetical order.
      .sort()
      .reduce((a: string, b: string): string => a + b);

    // signature is the md5sum of the base string
    return MD5(baseString);
  }

// just abstracts away redirection
export const redirectTo = (site: string): void => {
    window.location.assign(site);
}

// this generates common params instead of having wet code, adds additional params if needed 
export const generateParams = (token: string, method: string, additionalParams: string[] = ['']) => {
    return {
          'api_key': CONSUMER_KEY,
          'api_sig': generateSig([
            'auth_token' + token,
            'method' + method,
            'format' + 'json',
            'nojsoncallback' + '1',
             ...additionalParams
          ]),
          'auth_token': token,
          'format': 'json',
          'method': method,
          'nojsoncallback': '1',
        }
}

// abstracts away generating an img link
export const genImgSrc = (photo: Photo, option:string = 'thumb'): string => {
    const sizes = {
        'thumb': 'q',
        'small': 's',
        'medium': 'z',
        'large': 'c',
    }
    return `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_${sizes[option]}_d.jpg`;
}

export const Regexes = {
    email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
}