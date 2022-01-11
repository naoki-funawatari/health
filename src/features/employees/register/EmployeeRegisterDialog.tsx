import { useForm, SubmitHandler, FieldError } from "react-hook-form";

interface IEmployeeRegister {
  bu: string;
  ka: string;
  rank: string;
  no: string;
  name: string;
}

const defaultValues: IEmployeeRegister = {
  bu: "",
  ka: "",
  rank: "",
  no: "",
  name: "",
};

export default function EmployeeRegister() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IEmployeeRegister>({ defaultValues });
  const onSubmit: SubmitHandler<IEmployeeRegister> = data => console.log(data);

  function createErrorMessage(error: FieldError | undefined) {
    if (!error) {
      return null;
    }

    if (error.type === "required") {
      return <span>このフィールドは入力必須です。</span>;
    }

    if (error.type === "pattern") {
      return <span>入力形式が正しくありません。</span>;
    }

    return <span>入力値にエラーがあります。</span>;
  }

  return (
    <>
      <h2>社員一覧</h2>
      <p>※画面のみ機能未実装※</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div>部</div>
          <div>
            <input {...register("bu", { required: true })} />
            {createErrorMessage(errors.bu)}
          </div>
        </div>
        <div>
          <div>課</div>
          <div>
            <input {...register("ka", { required: true })} />
            {createErrorMessage(errors.ka)}
          </div>
        </div>
        <div>
          <div>職位</div>
          <div>
            <input {...register("rank")} />
          </div>
        </div>
        <div>
          <div>社員番号</div>
          <div>
            <input {...register("no", { required: true, pattern: /^T\d{6}$/ })} />
            {createErrorMessage(errors.no)}
          </div>
        </div>
        <div>
          <div>氏名</div>
          <div>
            <input {...register("name", { required: true })} />
            {createErrorMessage(errors.name)}
          </div>
        </div>
        <div>
          <input type="submit" />
        </div>
      </form>
    </>
  );
}
