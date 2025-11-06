'use client';
import { useFormValidate } from "@/hooks/useFormValidate";
import { SignUpSchema } from "@/schemas/auth";
import { TSignUpFormError } from "@/types/form";
import { ChangeEvent } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import FormCard from "./FormCard";
import FormMessage from "./FormMessage";
import Submit from "./Submit";

export default function SignUpForm() {
  const { errors, validateField } = useFormValidate<TSignUpFormError>(SignUpSchema);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    validateField(name, value);
  }
  console.log('errors',errors);
  return (
    <FormCard
        title="회원가입"
        footer={{
          label: "이미 계정이 있으신가요?", href: "/login"
        }}
      >
      <form className="space-y-6">
        {/* 이름 */}
        <div className="space-y-1">
          <Label htmlFor="name">이름</Label>
          <Input 
          id="name"
          name="name"
          placeholder="이름을 입력해주세요"
          error={!!errors?.name}
          onChange={handleChange}></Input>
          {errors?.name && <FormMessage message={errors?.name[0]} />}
        </div>
        {/* 이메일 */}
        <div className="space-y-1">
          <Label htmlFor="email">이메일</Label>
          <Input 
          id="email"
          name="email"
          type="email"
          placeholder="test@test.com"
          error={!!errors?.email}
          onChange={handleChange}></Input>
          {errors?.email && <FormMessage message={errors?.email[0]} />}
        </div>
        {/* 비밀번호 */}
        <div className="space-y-1">
          <Label htmlFor="password">비밀번호</Label>
          <Input 
          id="password"
          name="password"
          type="password"
          placeholder="***********"
          error={!!errors?.password}
          onChange={handleChange}></Input>
          {errors?.password && <FormMessage message={errors?.password[0]} />}
        </div>
        <Submit className="w-full">가입하기</Submit>
      </form>
    </FormCard>
  );
};
