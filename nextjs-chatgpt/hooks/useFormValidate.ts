import { useState } from "react";
import { ZodObject, ZodRawShape } from "zod";

export function useFormValidate<T>(schema: ZodObject<ZodRawShape>) {//검증할 스키마를 인자로 받음
  //<T> 폼의 필드가 달라지기 때문에 gereric타입사용해서 해당 hook외부에서 타입지정가능
  const [errors, setErrors] = useState<Partial<T>>(); //폼 에러메시지 상태관리
  //Partial<T>: 주어진 타입의 모든 프로퍼티를 optional하게 만들어주는 기능을 제공하는 유틸리티 함수
  //fieldErrors객체의 키는 에러메시지가 있을때만 존재하기 때문에 optional처리 

  //검증함수
  const validateField = (name: string, value: string) =>{
    setErrors({
        ...errors,
        [name]: undefined,//검증시작할때 해당필드 에러메시지 초기화
      })
    const parsedValue = schema.pick({[name]: true}).safeParse({
      //pick메서드: 검증할 필드만 선택 첫인자가 true인 필드 value 검증
      [name]: value,
    })

    if(!parsedValue.success){
      setErrors({
        ...errors,//다른 필드 영향가지 않도록 기존에러객체복사
        ...parsedValue.error.flatten().fieldErrors,
        //fieldErrors: 각 필드별 에러메시지 객체를 에러에 넣는작업
      })
    }
  }
  return { errors, validateField };
}
