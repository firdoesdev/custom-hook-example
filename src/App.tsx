import { Button, Flex, Form, Input, InputNumber } from "antd";
import { FormItem } from "react-hook-form-antd";
import { usePosts, useCreatePost } from "./modules/posts/hooks";


//List Post Component
const Posts = () => {
  const { data } = usePosts();

  return (
    <div style={{ height: "50%", overflowY: "scroll", width: 600 }}>
      {data?.map((post) => (
        <p key={post.id}>{post.title}</p>
      ))}
    </div>
  );
};

function App() {
  const { control, handleSubmit, notifContext , isPending} = useCreatePost();

  return (
    <>
      {notifContext}
      <Flex
        style={{
          height: "100vh",
          justifyContent: "start",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h1>Todo App</h1>
        <Form
          onFinish={handleSubmit}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          style={{ width: 600 }}
        >
          <FormItem control={control} name={"userId"} label={"User Id"}>
            <InputNumber />
          </FormItem>
          <FormItem control={control} name={"title"} label={"Title"}>
            <Input />
          </FormItem>
          <FormItem control={control} name={"body"} label={"Body"}>
            <Input />
          </FormItem>
          <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
            <Button type="primary" htmlType="submit" loading={isPending}>
              Submit
            </Button>
          </Form.Item>
        </Form>
        <Posts />
      </Flex>
    </>
  );
}

export default App;
