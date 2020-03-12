import React from 'react';
import { Layout, Form, Input, Button, Checkbox } from 'antd';

import doSignUp from '../request/index'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 8 },
};

class LoginIndex extends React.Component {
  render() {
    const onFinish = values => {
      console.log('Success:', values);
      doSignUp(values).then(res => {
        console.info('res')
        console.info(res)
      })
    };

    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo);
    };

    return (
      <Layout className="minheight-fill-100">
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          style={{ marginTop: '150px' }}
        >
          <Form.Item
            label="用户名"
            name="name"
            rules={[{ required: true, message: '请输入您的用户名!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="邮箱"
            name="email"
            rules={[{ required: true, message: '请输入您的邮箱!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入您的密码!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="确认密码"
            name="confirm_password"
            rules={[{ required: true, message: '请输入您的确认密码!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout} name="remember" valuePropName="checked">
            <Checkbox>记住密码</Checkbox>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              提交
        </Button>
          </Form.Item>
        </Form>
      </Layout>
    )
  }
}
export default LoginIndex;