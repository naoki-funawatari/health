import { useForm, SubmitHandler, FieldError } from "react-hook-form";

interface IBuForm {
  name: string;
}

const defaultValues: IBuForm = {
  name: "",
};

export default function BuForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IBuForm>({ defaultValues });
  const onSubmit: SubmitHandler<IBuForm> = data => console.log(data);

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
      <h2>メンテナンス - 部</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div>名前</div>
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
