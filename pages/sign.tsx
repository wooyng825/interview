import { auth } from '@/config/firebaseClient';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useForm } from 'react-hook-form';
import { DataType, useDataStore } from '@/config/store';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';

enum Type { signIn, signUp };

interface HookFormTypes {
    email: string,
    pw: string,
}


export default function Sign() {
    const router = useRouter();
    const { register, handleSubmit, reset } = useForm<HookFormTypes>();
    const { setUserData, setUserState } = useDataStore();

    const onValid = {
        SignIn: (data: HookFormTypes) => {
            signIn(data);
            reset();
        },
        SignUp: (data: HookFormTypes) => {
            signUp(data);
            reset();
        }
    };

    // 로그인 함수
    const signIn = async (data: HookFormTypes) => {
        await signInWithEmailAndPassword(
            auth,
            data.email,
            data.pw,
        ).then(async (res) => {
            const [email, uid] = [res.user.email, res.user.uid];
            setUserData(DataType.email, email!);
            setUserData(DataType.uid, uid);
            setUserState();
            toast.success('로그인 성공!');
            router.push("/");
        }).catch((error) => {
            handleError(error.code, Type.signIn);
        });
    };

    // 회원가입 함수
    const signUp = async (data: HookFormTypes) => {
        await createUserWithEmailAndPassword(
            auth,
            data.email,
            data.pw,
        ).then((res) => {
            toast.success('회원가입을 완료했습니다.');
        }).catch((error) => {
            handleError(error.code, Type.signUp);
        });
    }

    // 에러 관련 함수
    const handleError = (code: string, type: Type) => {
        let message;
        if (type == Type.signIn) {
            switch (code) {
                case 'auth/invalid-email':
                    message = '이메일 형식이 올바르지 않습니다.';
                    break;
                case 'auth/user-not-found':
                    message = '등록되지 않은 이메일입니다.';
                    break;
                case 'auth/user-disabled':
                    message = '사용할 수 없는 이메일입니다.';
                    break;
                case 'auth/wrong-password':
                    message = '비밀번호가 틀렸습니다.';
                    break;
                case 'auth/too-many-requests':
                    message = '잠시 후 다시 시도해 주세요.';
                    break;
                case 'auth/network-request-failed':
                    message = '네트워크 연결에 실패하였습니다.';
                    break;
                default:
                    message = '로그인에 실패하였습니다.\n다시 시도해 주세요.';
                    break;
            }
        }
        else {
            switch (code) {
                case 'auth/email-in-use':
                    message = '이미 등록된 이메일입니다.';
                    break;
                case 'auth/invalid-email':
                    message = '유효하지 않은 이메일입니다.';
                    break;
                case 'auth/operation-not-allowed':
                    message = '허용되지 않은 문자가 포함되어 있습니다.';
                    break;
                case 'auth/weak-password':
                    message = '안전하지 않은 비밀번호입니다.';
                    break;
                default:
                    message = '회원가입에 실패하였습니다.\n다시 시도해 주세요.';
                    break;
            }
        }
        toast.error(message);
    }

    return (
        <>
            <section className="py-20 w-1/2 opacity-80 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center bg-white border-2 border-sky-300 rounded-lg">
                <main>
                    <form className="flex justify-center">
                        <div className="flex w-1/2 flex-col m-0">
                            <input id="email" className="input-box" type="email" placeholder="Email" autoFocus
                                {...register("email", { required: true })} />
                            <input id="pw" className="input-box" type="password" placeholder="Password"
                                {...register("pw", { required: true })} />
                        </div>
                        <div className="flex mx-1">
                            <input type="submit" id="sign-in" className="submit-btn bg-yellow-300 hover:scale-105" value="로그인" onClick={handleSubmit(onValid.SignIn)} />
                            <input type="submit" id="sign-up" className="submit-btn bg-white border-2 border-yellow-300 hover:scale-105" value="회원가입" onClick={handleSubmit(onValid.SignUp)} />
                        </div>
                    </form>
                </main>
            </section >
            <style jsx>{`
                #sign-in, #sign-up {
                    transition: all .2s ease-in;
                }
            `}</style>
        </>
    );
}