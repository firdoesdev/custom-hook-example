import axios from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";
import { TPost , TCreatePostSchema, TCreatePost} from "./type";
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import { notification} from 'antd'


export const usePosts = () => {
  //Get List Data
  const { data, error, isLoading } = useQuery<TPost[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axios.get<TPost[]>(
        "https://jsonplaceholder.typicode.com/posts"
      );
      return data;
    },
  });

  return {
    data,
    error,
    isLoading,
  };
};


export const useCreatePost = () => {

    // Notification
    const [api, contextHolder] = notification.useNotification();

    // Form
    const {control, handleSubmit} = useForm<TCreatePost>({
      resolver: zodResolver(TCreatePostSchema)
    })
  

    // Mutation
  const { mutate, isPending } = useMutation<TPost, Error, TCreatePost>({
    mutationFn: async (data) => {
      const { data: post } = await axios.post<TPost>(
        "https://jsonplaceholder.typicode.com/posts",
        data
      );
      return post;
    },
    // Success Handler
    onSuccess: () => {
      api.success({
        message: "Post created successfully",
      });
    },

    // Error Handlers
    onError: () => {
      api.error({
        message: "Error creating post",
      });
    },
  });

  const onSubmitForm = (data: TCreatePost) => {   
    mutate(data);
  };

  return {
    control,
    handleSubmit: handleSubmit(onSubmitForm),
    isPending,
    notifContext: contextHolder
    
  };

}
    
   
  