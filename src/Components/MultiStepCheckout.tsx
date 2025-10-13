import Footer from "./Footer";
import { useLocation } from "react-router-dom";

import { useMemo, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./multistep-checkout.css";

type FormValues = {
  isMember: boolean;
  fullName: string;
  email: string;
  phone: string;
  memberEmail: string;
  memberPassword: string;
  address: string;
  city: string;
  zip: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
  agree: boolean;
};

const steps = [
  { key: "step1", label: "Kişisel Bilgiler" },
  { key: "step2", label: "Adres Bilgileri" },
  { key: "step3", label: "Ödeme" },
  { key: "step4", label: "Onay" },
] as const;


export default function MultiStepCheckout() {
  const [step, setStep] = useState(0);
  const location = useLocation();
  const total = location.state && location.state.total ? location.state.total : 0;

  const initialValues: FormValues = useMemo(
    () => ({
      isMember: false,
      fullName: "",
      email: "",
      phone: "",
      memberEmail: "",
      memberPassword: "",
      address: "",
      city: "",
      zip: "",
      cardNumber: "",
      expiry: "",
      cvv: "",
      agree: false,
    }),
    []
  );

  const schemas = [
    Yup.object({
      isMember: Yup.boolean().required(),
      memberEmail: Yup.string().when("isMember", {
        is: true,
        then: (s) => s.email("Geçersiz e-posta").required("Zorunlu"),
        otherwise: (s) => s.notRequired(),
      }),
      memberPassword: Yup.string().when("isMember", {
        is: true,
        then: (s) => s.min(6, "En az 6 karakter").required("Zorunlu"),
        otherwise: (s) => s.notRequired(),
      }),
      fullName: Yup.string().when("isMember", {
        is: false,
        then: (s) => s.required("Zorunlu"),
        otherwise: (s) => s.notRequired(),
      }),
      email: Yup.string().when("isMember", {
        is: false,
        then: (s) => s.email("Geçersiz e-posta").required("Zorunlu"),
        otherwise: (s) => s.notRequired(),
      }),
      phone: Yup.string().when("isMember", {
        is: false,
        then: (s) => s.min(10, "Eksik").required("Zorunlu"),
        otherwise: (s) => s.notRequired(),
      }),
    }),
    Yup.object({
      address: Yup.string().when("isMember", {
        is: false,
        then: (s) => s.required("Zorunlu"),
        otherwise: (s) => s.notRequired(),
      }),
      city: Yup.string().when("isMember", {
        is: false,
        then: (s) => s.required("Zorunlu"),
        otherwise: (s) => s.notRequired(),
      }),
      zip: Yup.string().when("isMember", {
        is: false,
        then: (s) => s.required("Zorunlu"),
        otherwise: (s) => s.notRequired(),
      }),
    }),
    Yup.object({
      cardNumber: Yup.string().min(12, "Eksik").required("Zorunlu"),
      expiry: Yup.string().matches(/^\d{2}\/\d{2}$/, "MM/YY").required("Zorunlu"),
      cvv: Yup.string().min(3, "Eksik").required("Zorunlu"),
      agree: Yup.boolean().oneOf([true], "Sözleşmeyi onaylayın"),
    }),
    Yup.object({}),
  ];

  const next = async (validateForm: any, setTouched: any) => {
    const errs = await validateForm();
    if (Object.keys(errs).length) {
      setTouched(Object.fromEntries(Object.keys(errs).map((k) => [k, true])), false);
      return;
    }
    setStep((s) => Math.min(s + 1, steps.length - 1));
  };

  const prev = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <div className="checkout-wrapper" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <div style={{ display: 'flex', flex: 1, width: '100%', alignItems: 'flex-start', justifyContent: 'center' }}>
        <aside className="steps">
          <ol>
            {steps.map((s, i) => {
              const state = i < step ? "done" : i === step ? "active" : "todo";
              return (
                <li key={s.key} data-state={state} style={{ display: 'flex', alignItems: 'center', marginBottom: 18 }}>
                  <span className="index">{i + 1}</span>
                  <span className="label" style={{ marginLeft: 10, fontWeight: 600, fontSize: 15 }}>{s.label}</span>
                </li>
              );
            })}
          </ol>
        </aside>

        <main className="panel" style={{ background: '#fafbfc', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.06)', padding: 18, minWidth: 350, maxWidth: 520, width: '100%', maxHeight: 540, overflowY: 'auto', marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, marginBottom: 18 }}>{steps[step].label}</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={schemas[step]}
            onSubmit={(vals) => {
              alert("Sipariş oluşturuldu!\n" + JSON.stringify(vals, null, 2));
            }}
          >
            {({ validateForm, setTouched, values }) => (
              <Form className="form-grid">
                {step === 0 && (
                  <>
                    <div className="radio-row">
                      <label className="radio">
                        <Field
                          type="radio"
                          name="isMember"
                          value="true"
                          checked={values.isMember === true}
                          onChange={() => values.isMember = true}
                        />
                        <span>Üyeyim (kayıtlı hesabımla devam et)</span>
                      </label>
                      <label className="radio">
                        <Field
                          type="radio"
                          name="isMember"
                          value="false"
                          checked={values.isMember === false}
                          onChange={() => values.isMember = false}
                        />
                        <span>Üye olmadan devam et</span>
                      </label>
                    </div>

                    {values.isMember ? (
                      <>
                        <Field name="memberEmail" placeholder="E-posta (üye)" className="input" style={{ width: 320, height: 48, borderRadius: 16 }} />
                        <ErrorMessage name="memberEmail" component="span" className="err" />
                        <Field
                          name="memberPassword"
                          type="password"
                          placeholder="Şifre"
                          className="input"
                          style={{ width: 320, height: 48, borderRadius: 16 }}
                        />
                        <ErrorMessage name="memberPassword" component="span" className="err" />
                      </>
                    ) : (
                      <>
                        <Field name="fullName" placeholder="Ad Soyad" className="input" style={{ width: 320, height: 48, borderRadius: 16 }} />
                        <ErrorMessage name="fullName" component="span" className="err" />

                        <Field name="email" placeholder="E-posta" className="input" style={{ width: 320, height: 48, borderRadius: 16 }} />
                        <ErrorMessage name="email" component="span" className="err" />

                        <Field name="phone" placeholder="Telefon" className="input" style={{ width: 320, height: 48, borderRadius: 16 }} />
                        <ErrorMessage name="phone" component="span" className="err" />
                      </>
                    )}
                  </>
                )}

                {step === 1 && (
                  <>
                    {values.isMember && (
                      <div className="summary">
                        Kayıtlı adresiniz kullanılacak. İsterseniz yeni adres girebilirsiniz.
                      </div>
                    )}
                    <Field name="address" placeholder="Adres" className="input" style={{ width: 320, height: 48, borderRadius: 16 }} />
                    <ErrorMessage name="address" component="span" className="err" />

                    <Field name="city" placeholder="Şehir" className="input" style={{ width: 320, height: 48, borderRadius: 16 }} />
                    <ErrorMessage name="city" component="span" className="err" />

                    <Field name="zip" placeholder="Posta Kodu" className="input" style={{ width: 320, height: 48, borderRadius: 16 }} />
                    <ErrorMessage name="zip" component="span" className="err" />
                  </>
                )}

                {step === 2 && (
                  <>
                    <Field name="cardNumber" placeholder="Kart Numarası" className="input" style={{ width: 320, height: 48, borderRadius: 16 }} />
                    <ErrorMessage name="cardNumber" component="span" className="err" />

                    <Field name="expiry" placeholder="Son Kullanım (MM/YY)" className="input" style={{ width: 320, height: 48, borderRadius: 16 }} />
                    <ErrorMessage name="expiry" component="span" className="err" />

                    <Field name="cvv" placeholder="CVV" className="input" style={{ width: 320, height: 48, borderRadius: 16 }} />
                    <ErrorMessage name="cvv" component="span" className="err" />

                    <label className="check">
                      <Field type="checkbox" name="agree" />
                      <span>Satış sözleşmesi ve KVKK metnini okudum, onaylıyorum.</span>
                    </label>
                    <ErrorMessage name="agree" component="span" className="err" />
                  </>
                )}

                {step === 3 && (
                  <div className="summary">
                    <h3>Özet</h3>
                    <ul>
                      <li><b>Üyelik:</b> {values.isMember ? "Üye" : "Misafir"}</li>
                    </ul>
                    <div style={{ fontWeight: 700, color: '#d81b60', fontSize: 18, marginTop: 12 }}>
                      Ödenecek Tutar: {total} TL
                    </div>
                  </div>
                )}

                <div className="nav">
                  {step > 0 && (
                    <button type="button" className="btn ghost" onClick={prev}>
                      Geri
                    </button>
                  )}
                  {step < steps.length - 1 ? (
                    <button
                      type="button"
                      className="btn primary"
                      onClick={() => next(validateForm, setTouched)}
                    >
                      Devam
                    </button>
                  ) : (
                    <button type="submit" className="btn primary">
                      Satın Al
                    </button>
                  )}
                </div>
              </Form>
            )}
          </Formik>
        </main>
      </div>
      <div className="checkout-footer" style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: 24 }}>
        <Footer />
      </div>
    </div>
  );
}
