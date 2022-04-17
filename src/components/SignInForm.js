import React, {useState} from 'react';
import {useFormik} from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import {FormControl, Input, InputGroup, InputLeftElement, Checkbox, Button, useToast} from '@chakra-ui/react';
import {AiFillMobile, AiFillLock} from 'react-icons/ai';
import './SignInForm.css';

const validateEmailOrPhone = (value, context) => {
  const phoneReg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
  const emailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
  return phoneReg.test(value) || emailReg.test(value);
};

const SignInForm = () => {
  const [submitting, setSubmitting] = useState(false);
  const toast = useToast();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      isRemember: false
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Required').test('emailOrPhone', '请输入正确的手机号或邮箱', validateEmailOrPhone),
      password: Yup.string().min(8).required('required')
    }),
    onSubmit: async values => {
      try {
        setSubmitting(true);
        await axios.request({
          method: 'post',
          url: 'https://conduit.productionready.io/api/users/login',
          data: {user: values}
        });
      } catch (e) {
        toast({
          title: '注册失败：' + e,
          position: 'top',
        });
      } finally {
        setSubmitting(false);
      }
    }
  });

  return (
    <div className="sign-in-wrapper">
      <form onSubmit={formik.handleSubmit}>
        <FormControl mb={2}>
          <InputGroup>
            <InputLeftElement
              pointerEvents='none'
              children={<AiFillMobile color='gray.300' />} />
            <Input
              id="username"
              placeholder="手机号或邮箱"
              type="text"
              {...formik.getFieldProps('username')} />
          </InputGroup>
        </FormControl>
        {formik.errors.username ? <div>{formik.errors.username}</div> : null}
        <FormControl mb={2}>
          <InputGroup>
            <InputLeftElement
              pointerEvents='none'
              children={<AiFillLock color='gray.300' />} />
            <Input
              id="password"
              type="password"
              placeholder="密码"
              {...formik.getFieldProps('password')} />
          </InputGroup>
        </FormControl>
        {formik.errors.password ? <div>{formik.errors.password}</div> : null}
        <div className="help-wrapper">
          <FormControl flex={1}>
            <Checkbox id="isRemember" {...formik.getFieldProps('isRemember')}>记住我</Checkbox>
          </FormControl>
          <span>登录遇到问题？</span>
        </div>
        <div className="submit-wrapper">
          <Button
            type="submit"
            width="100%"
            colorScheme="blue"
            isLoading={submitting}>
            登录
          </Button>
        </div>
      </form>
      <div className="more-sign-in">
        <h6>社交账号登录</h6>
        <ul>
          <li>
            <i className="iconfont icon-weibo" />
          </li>
          <li>
            <i className="iconfont icon-wechat" />
          </li>
          <li>
            <i className="iconfont icon-qq" />
          </li>
        </ul>
      </div>
    </div>
  )
};

export default SignInForm;
