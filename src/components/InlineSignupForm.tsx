import { registerUniformComponent } from "@uniformdev/canvas-react";
import { FormEvent, useState } from "react";
import MailchimpSubscribe from "react-mailchimp-subscribe";

type InlineSignupFormsPropsType = {
  cta: string;
  placeholder?: string;
  actionUrl: string;
  teaser?: string;
};
type InlineFormProps = {
  status: "error" | "success" | "sending" | null;
  message: string | Error | null;
  cta: string;
  actionUrl: string;
  placeholder?: string;
  onValidated: (formData: any) => void;
};
const InlineForm = ({
  status,
  cta,
  actionUrl,
  placeholder,
  message,
  onValidated,
}: InlineFormProps) => {
  const [email, setEmail] = useState("");
  const submit = (e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (email && email.indexOf("@") > -1) {
      onValidated({
        EMAIL: email,
      });
    }
  };
  return (
    <form
      action={actionUrl}
      method="post"
      target="popupwindow"
      className="w-full mt-6"
      onSubmit={submit}
    >
      {status === "sending" && (
        <div className="p-4 text-blue-500">sending...</div>
      )}
      {status === "error" && (
        <div
          className="p-4 text-red-600"
          dangerouslySetInnerHTML={{ __html: message ? message : "" }}
        ></div>
      )}
      {status === "success" && <div className="p-4 text-teal-500">Thanks!</div>}

      <div className="rounded-lg sm:focus-within:shadow-outline">
        <div className="sm:flex sm:shadow sm:rounded-lg sm:overflow-hidden">
          <input type="hidden" value="1" name="embed" />
          <input
            type="email"
            className="block w-full px-6 py-4 mb-4 text-black border border-transparent rounded-lg shadow sm:shadow-none focus:border-indigo sm:rounded-r-none sm:mb-0 sm:flex-1 lg:py-5 focus:outline-none"
            name="email_address"
            placeholder={placeholder ? placeholder : "Enter your email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            disabled={status !== null && status === "sending"}
            className="block w-full px-6 py-4 text-sm font-semibold tracking-wide text-white uppercase bg-teal-500 rounded-lg shadow sm:shadow-none sm:w-auto sm:rounded-none focus:outline-none hover:bg-teal-700 text-shadow lg:py-5"
          >
            {cta}
          </button>
        </div>
      </div>
    </form>
  );
};

export function initialSignupForm({
  cta,
  placeholder,
  actionUrl,
  teaser,
}: InlineSignupFormsPropsType) {
  return (
    <MailchimpSubscribe
      url="https://statilix.us16.list-manage.com/subscribe/post?u=19b98089cf0ee082f3fef5efd&amp;id=5392031228"
      render={({ subscribe, status, message }) => (
        <div className="max-w-3xl mx-auto">
          {teaser ? (
            <p className="text-sm text-gray-700 p-4">{teaser}</p>
          ) : null}
          <InlineForm
            status={status}
            cta={cta}
            placeholder={placeholder}
            message={message}
            onValidated={(formData) => subscribe(formData)}
            actionUrl={actionUrl}
          />
        </div>
      )}
    />
  );
}

registerUniformComponent({
  type: "inlineSignupForm",
  component: initialSignupForm,
});
