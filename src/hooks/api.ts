import {camelizeKeys} from 'humps';
import axios from 'axios';
import {getParameterByName} from 'Utils';
import buildProgress from 'Utils/progress';

export const cancelToken: any = () => axios.CancelToken.source();

export function getCookie(cname: string) {
  var name = cname + '=';
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

function getOptions(
  request?: any,
  downloadProgress?: boolean,
  uploadProgress?: boolean,
) {
  let optionModel: any = {
    headers: {},
    cancelToken: cancelToken.token,
    withCredentials: true

  };
  if (uploadProgress) {
    optionModel.onUploadProgress = function (progressEvent: any) {
      let totalSize = progressEvent.total;
      buildProgress('آپلود', progressEvent.loaded, totalSize);
    };
  }
  if (downloadProgress) {
    optionModel.onDownloadProgress = function (progressEvent: any) {
      let totalSize = progressEvent.total;
      buildProgress(request.documentName, progressEvent.loaded, totalSize);
    };
  }
  return optionModel;
}

export function getServerUrl() {
  return window.publicUrl || process.env.apiAddress;
}

const normalizeResponse = (response: any) => {
  if (response.status !== 200) {
    return Promise.reject(response);
  }
  const camelizedJson = camelizeKeys(response.data);
  return Object.assign(camelizedJson);
};

const removeAllCookie = () => {
  var cookies = document.cookie.split(';');
  cookies.map((cookie) => {
    let days = -1;
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      var expires = '; expires=' + date.toUTCString();
    } else var expires = '';
    document.cookie = cookie + '=' + '' + expires + '; path=/';
  });
};

const handleError = (error: any) => {
  if (error.request.status === 401) {
    removeAllCookie();
    window.location.href = `${
      window.publicUrl || process.env.apiAddress
    }/Signin?ReturnUrl=${window.location.href}`;
  }
  return Promise.reject(error);
};

// This makes every API response have the same shape, regardless of how nested it was.
export const postApi = (
  endpoint: string,
  body: any,
  params?: any,
  options?: any,
) => {
  let fullUrl =
    endpoint.indexOf(`${getServerUrl()}/`) === -1
      ? `${getServerUrl()}/${endpoint}`
      : endpoint;

  if (params) {
    fullUrl = fullUrl + '?';
    Object.keys(params).forEach((element) => {
      if (
        params[element as keyof typeof params] === undefined ||
        params[element as keyof typeof params] === null
      )
        throw new Error(
          `The parameter '${element}' must be defined and cannot be null.`,
        );
      else
        fullUrl +=
          element +
          '=' +
          encodeURIComponent('' + params[element as keyof typeof params]) +
          '&';
    });
    fullUrl = fullUrl.replace(/[?&]$/, '');
  }

  return axios
    .post(fullUrl, body, {
      ...options,
      ...getOptions(body),
    })
    .then((response) => normalizeResponse(response))
    .catch((error) => handleError(error));
};

export const getApi = (
  endpoint?: any,
  params?: any,
  options?: any,
): Promise<any> => {
  let fullUrl =
    endpoint.indexOf(`${getServerUrl()}/`) === -1
      ? `${getServerUrl()}/${endpoint}`
      : endpoint;

  if (params) {
    fullUrl = fullUrl + '?';
    Object.keys(params).forEach((element) => {
      if (params[element] === undefined || params[element] === null)
        //   throw new Error(
        //     `The parameter '${element}' must be defined and cannot be null.`
        //   );
        params[element] = '';
      else
        fullUrl +=
          element + '=' + encodeURIComponent('' + params[element]) + '&';
    });
    fullUrl = fullUrl.replace(/[?&]$/, '');
  }

  return axios
    .get(fullUrl, {...options, ...getOptions(params)})
    .then((response) => normalizeResponse(response))
    .catch((error) => handleError(error));
};

export const getBlob = async (endpoint: string, params?: any, config?: any) => {
  let fullUrl =
    endpoint.indexOf(`${getServerUrl()}/`) === -1
      ? `${getServerUrl()}/${endpoint}`
      : endpoint;
  if (params) {
    fullUrl = fullUrl + '?';
    Object.keys(params).forEach((element) => {
      if (params[element] === undefined || params[element] === null)
        params[element] = '';
      else
        fullUrl +=
          element + '=' + encodeURIComponent('' + params[element]) + '&';
    });
    fullUrl = fullUrl.replace(/[?&]$/, '');
  }

  const res = await axios.get(fullUrl, {
    ...getOptions(params),
    ...config,
    responseType: 'blob',
  });
  return res;
};

export const postBlob = async (
  endpoint: string,
  body: any,
  params?: any,
  config?: any,
) => {
  let fullUrl =
    endpoint.indexOf(`${getServerUrl()}/`) === -1
      ? `${getServerUrl()}/${endpoint}`
      : endpoint;

  if (params) {
    fullUrl = fullUrl + '?';
    Object.keys(params).forEach((element) => {
      if (params[element] === undefined || params[element] === null)
        throw new Error(
          `The parameter '${element}' must be defined and cannot be null.`,
        );
      else
        fullUrl +=
          element + '=' + encodeURIComponent('' + params[element]) + '&';
    });
    fullUrl = fullUrl.replace(/[?&]$/, '');
  }
  const res = await axios.post(fullUrl, body, {
    ...getOptions(body, true, true),
    ...config,
    responseType: 'blob',
  });
  return res;
};

// export const putApi = (
//   endpoint: string,
//   body: any,
//   params?: any,
//   options?: any,
// ) => {
//   let fullUrl =
//     endpoint.indexOf(`${getServerUrl()}` + '/') === -1
//       ? `${getServerUrl()}` + '/' + endpoint
//       : endpoint;

//   if (params) {
//     fullUrl = fullUrl + '?';
//     Object.keys(params).forEach((element) => {
//       if (params[element] === undefined || params[element] === null)
//         throw new Error(
//           `The parameter '${element}' must be defined and cannot be null.`,
//         );
//       else
//         fullUrl +=
//           element + '=' + encodeURIComponent('' + params[element]) + '&';
//     });
//     fullUrl = fullUrl.replace(/[?&]$/, '');
//   }

//   return axios
//     .put(fullUrl, body, {...options, ...getOptions(body)})
//     .then((response) => normalizeResponse(response))
//     .catch((error) => handleError(error));
// };

// export const deleteApi = (endpoint: string, params?: any, options?: any) => {
//   let fullUrl =
//     endpoint.indexOf(`${getServerUrl()}` + '/') === -1
//       ? `${getServerUrl()}` + '/' + endpoint
//       : endpoint;

//   if (params) {
//     fullUrl = fullUrl + '?';
//     Object.keys(params).forEach((element) => {
//       if (params[element] === undefined || params[element] === null)
//         throw new Error(
//           `The parameter '${element}' must be defined and cannot be null.`,
//         );
//       else
//         fullUrl +=
//           element + '=' + encodeURIComponent('' + params[element]) + '&';
//     });
//     fullUrl = fullUrl.replace(/[?&]$/, '');
//   }

//   return axios
//     .delete(fullUrl, {...options, ...getOptions(params)})
//     .then((response) => normalizeResponse(response))
//     .catch((error) => handleError(error));
// };
