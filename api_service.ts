import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const baseURL = "api url";

let activeRequests = 0;

const showLoading = () => {
  activeRequests++;
  if (activeRequests > 1) {
    return;
  }

  const darkScamDiv = document.createElement("div");
  darkScamDiv.className = "dark-scam";

  const spinnerDiv = document.createElement("div");
  spinnerDiv.className = "spinner";

  for (let i = 0; i < 5; i++) {
    const div = document.createElement("div");
    spinnerDiv.appendChild(div);
  }

  darkScamDiv.appendChild(spinnerDiv);

  document.body.appendChild(darkScamDiv);
};

const hideLoading = () => {
  activeRequests--;
  if (activeRequests === 0) {
    const darkScamDiv = document.querySelector(".dark-scam");

    if (darkScamDiv) {
      document.body.removeChild(darkScamDiv);
    }
  }
};

const apiService = axios.create({
  baseURL,
});

apiService.interceptors.request.use(
  (config) => {
    showLoading();
    return config;
  },
  (error) => {
    hideLoading();
    return Promise.reject(error);
  }
);

apiService.interceptors.response.use(
  (response) => {
    hideLoading();
    return response;
  },
  (error) => {
    hideLoading();
    return Promise.reject(error);
  }
);

interface PerformCRUDParams {
  method: AxiosRequestConfig["method"];
  endpoint: string;
  data?: any;
}

export const performLoginCRUD = async ({
  method,
  endpoint,
  data,
}: PerformCRUDParams): Promise<any> => {
  try {
    const response: AxiosResponse = await apiService({
      method,
      url: endpoint,
      data,
    });
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const performCRUD = async ({
  method,
  endpoint,
  data,
}: PerformCRUDParams): Promise<any> => {
  const getLocalStorage = () => {
    try {
      const data = window.localStorage.getItem("systemUser");
      return JSON.parse(data!);
    } catch (e) {
      return null;
    }
  };

  const acess = getLocalStorage();

  try {
    const response: AxiosResponse = await apiService({
      method,
      url: endpoint,
      data,
      headers: {
        Authorization: acess ? "Bearer " + acess.accessToken : null,
      },
    });
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export default apiService;

// EXEMPLO DE USO
async function postItems() {
  try {
    const responseData = await performCRUD({
      method: "POST",
      endpoint: `/route`,
      data: { value: 5 },
    });
  } catch (error: any) {}
}
