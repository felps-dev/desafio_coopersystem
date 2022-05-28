import useSWR, { mutate } from "swr";

import api from "./api";

export default class DataModule {
  namespace: string = "";
  response: any;

  /**
   *
   * @param namespace String para identificar o modelo
   */
  constructor(namespace: string) {
    this.namespace = namespace;
  }

  refreshModel(forceurl?: string) {
    return mutate(forceurl ? forceurl : this.namespace, undefined);
  }

  save = async (body: any) => {
    body.id
      ? (this.response = await api().patch(
          `/${this.namespace}/${body.id}/`,
          body
        ))
      : (this.response = await api().post(`/${this.namespace}/`, body));
    if (this.response.status === 201 || this.response.status == 200)
      this.refreshModel();
    return true;
  };

  get = async (id: number, params: Object = {}) => {
    const response = await api().get(
      id ? `/${this.namespace}/${id}/` : `/${this.namespace}/`,
      {
        params,
      }
    );
    if (response) {
      return response.data;
    } else {
      return null;
    }
  };

  delete = async (prod: number) => {
    const deleted = await api().delete(`/${this.namespace}/${prod}/`);
    if (deleted.status === 204) {
      this.refreshModel();
      return true;
    } else {
      return false;
    }
  };

  action = async (
    type: "post" | "get" | "delete",
    route: string,
    data: any,
    id: string = "",
    idEnd: Boolean = false
  ) => {
    const defRoute = id
      ? idEnd
        ? `/${this.namespace}/${route}/${id}/`
        : `/${this.namespace}/${id}/${route}/`
      : `/${this.namespace}/${route}/`;
    switch (type) {
      case "post":
        return await api().post(defRoute, data);
      case "get":
        return await api().get(defRoute, { params: data });
      case "delete":
        return await api().delete(`/${this.namespace}/${route}/${id}/`);
    }
  };

  useModel(queryParms: Object = {}, id: number = 0, _paramsSerializer?: any) {
    return useSWR<any, any>(
      `${this.namespace}${JSON.stringify(queryParms)}`,
      async () => {
        const res = await api().get(
          id !== 0 ? `/${this.namespace}/${id}/` : `/${this.namespace}/`,
          {
            params: queryParms,
            paramsSerializer: _paramsSerializer,
          }
        );
        return res.data;
      }
    );
  }

  async _inserir(model: Object) {
    const res = await api().post(`/${this.namespace}/`, model);
    return res;
  }
}
