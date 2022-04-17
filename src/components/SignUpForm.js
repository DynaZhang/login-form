import React, {useState} from 'react';
import {useFormik} from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import {FormControl, Input, InputGroup, InputLeftElement, Button, useToast} from '@chakra-ui/react';
import {AiOutlineUser, AiFillMobile, AiFillLock} from 'react-icons/ai';
import './SignUpForm.css';

const validateEmailOrPhone = (value, context) => {
  const phoneReg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
  const emailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
  return phoneReg.test(value) || emailReg.test(value);
};

const SignUpForm = () => {
  const [submitting, setSubmitting] = useState(false);
  const toast = useToast();
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      isRemember: false
    },
    validationSchema: Yup.object({
      username: Yup.string().required('请填写你的昵称'),
      email: Yup.string().required('请填写你的手机号或邮箱').test('emailOrPhone', '请输入正确的手机号或邮箱', validateEmailOrPhone),
      password: Yup.string().min(8).required('请填写密码')
    }),
    onSubmit: async values => {
      alert(values)
      try {
        setSubmitting(true);
        await axios.request({
          method: 'post',
          url: 'https://conduit.productionready.io/api/users',
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
    <div className="sign-up-wrapper">
      <form onSubmit={formik.handleSubmit}>
        <FormControl mb={2}>
          <InputGroup>
            <InputLeftElement
              pointerEvents='none'
              children={<AiOutlineUser color='gray.300' />} />
            <Input
              id="username"
              placeholder="你的昵称"
              type="text" {...formik.getFieldProps('username')}
            />
          </InputGroup>
        </FormControl>
        {formik.errors.username ? <div>{formik.errors.username}</div> : null}
        <FormControl mb={2}>
          <InputGroup>
            <InputLeftElement
              pointerEvents='none'
              children={<AiFillMobile color='gray.300' />} />
            <Input
              id="email"
              placeholder="手机号或邮箱"
              type="text" {...formik.getFieldProps('email')}
            />
          </InputGroup>
        </FormControl>
        {formik.errors.email ? <div>{formik.errors.email}</div> : null}
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
        <div className="submit-wrapper">
          <Button
            type="submit"
            width="100%"
            colorScheme="green"
            isLoading={submitting}>
            注册
          </Button>
        </div>
        <div className="help-wrapper">
          <p>点击 “注册” 即表示您同意并愿意遵守简书</p>
          <p>
            <a href="/">用户协议</a>&nbsp;
            和
            &nbsp;<a href="/">隐私政策</a>
          </p>
        </div>
      </form>
      <div className="more-sign-up">
        <h6>社交帐号直接注册</h6>
        <ul>
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

export default SignUpForm;
