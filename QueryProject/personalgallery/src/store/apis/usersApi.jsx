import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { faker } from "@faker-js/faker";
//reducerPath: dışarıdan nasıl ulaşılacağını belirler. userAPi'ye ulaşmayı sağlar.
//baseQuery: nereye istek atacağımızı belirtiriz.
//fetchBaseQuery; çekeceğimiz veriler burda yer alır. baseUrl: ana url.
// fetchFn, gecikme süresi gibi diğer istekleri belirtiriz
//endpoint: data çekme, ekleme gibi işlemler burada yapılır
// query datayı çekmek için kullanılır. mutation güncellemek(ekleme, silme vs) için kullanılır.

const pause = (duration) => {
  // Promise ile bekleme süresi oluşturduk
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

const usersApi = createApi({
  reducerPath: "users",
  baseQuery: fetchBaseQuery({
    // buradaki kodlar diğer endpointslerde de etki eder.
    baseUrl: "http://localhost:3000/",
    fetchFn: async (...args) => {
      await pause(1000);
      return fetch(...args);
    },
  }),
  endpoints(builder) {
    return {
      fetchUsers: builder.query({
        providesTags: ["User"],
        query: () => {
          return {
            url: "/users",
            method: "GET",
          };
        },
      }),
      addUser: builder.mutation({
        //invalidatesTags ile User tagını iptal eder ve yeniden fetch etmesini saglar.
        invalidatesTags: () => {
          return [{ type: "User" }];
        },
        query: () => {
          return {
            url: "/users",
            method: "POST",
            body: {
              //ne eklediğimizi body içerisinde belirttik.
              name: faker.name.fullName(),
            },
          };
        },
      }),
      removeUser: builder.mutation({
        // silme işleminde de aynı mantıkla değişiklik oldugunda yeniden fetch edecek.
        invalidatesTags: () => {
          return [{ type: "User" }];
        },
        query: (user) => {
          return {
            url: `/users/${user.id}`,
            method: "DELETE",
          };
        },
      }),
    };
  },
});

export const { useFetchUsersQuery, useAddUserMutation, useRemoveUserMutation } =
  usersApi;
export { usersApi };
