import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const GuestSchema = Yup.object().shape({
  fullName: Yup.string().required("Ad Soyad zorunlu"),
  email: Yup.string().email("Geçerli bir e-posta girin").required("E-posta zorunlu"),
  phone: Yup.string().required("Telefon numarası zorunlu"),
  address: Yup.string().required("Adres zorunlu"),
  city: Yup.string().required("Şehir zorunlu"),
  district: Yup.string().required("İlçe zorunlu"),
  postalCode: Yup.string().required("Posta kodu zorunlu"),
  invoiceType: Yup.string().required("Fatura tipi zorunlu"),
  payment: Yup.string().required("Ödeme bilgisi zorunlu"),
});

const RegisteredSchema = Yup.object().shape({
  address: Yup.string().required("Adres seçimi zorunlu"),
  card: Yup.string().required("Kart seçimi zorunlu"),
});

const addresses = [
  "Ev: İstanbul, Kadıköy, 34710, Moda Sk. 5",
  "İş: İstanbul, Şişli, 34387, Büyükdere Cd. 100"
];
const cards = [
  "Visa **** 1234",
  "Mastercard **** 5678"
];

const CheckoutForm = () => {
  const [isGuest, setIsGuest] = useState(true);
  const [createAccount, setCreateAccount] = useState(false);

  return (
    <div className="checkout-form">
      <h2>Ödeme Ekranı</h2>
      <div className="checkout-choice">
        <label>
          <input
            type="checkbox"
            checked={isGuest}
            onChange={() => setIsGuest(true)}
          />
          Kayıt olmadan satın al
        </label>
        <label>
          <input
            type="checkbox"
            checked={!isGuest}
            onChange={() => setIsGuest(false)}
          />
          Kayıtlı kullanıcı olarak devam et
        </label>
      </div>
      {isGuest ? (
        <Formik
          initialValues={{
            fullName: "",
            email: "",
            phone: "",
            address: "",
            city: "",
            district: "",
            postalCode: "",
            invoiceType: "bireysel",
            payment: "",
          }}
          validationSchema={GuestSchema}
          onSubmit={(values) => {
            alert("Siparişiniz başarıyla alındı!\n" + JSON.stringify(values, null, 2));
          }}
        >
          <Form>
            <div className="form-group">
              <label>Ad Soyad</label>
              <Field name="fullName" type="text" />
              <ErrorMessage name="fullName" component="div" className="form-error" />
            </div>
            <div className="form-group">
              <label>E-posta adresi</label>
              <Field name="email" type="email" />
              <ErrorMessage name="email" component="div" className="form-error" />
            </div>
            <div className="form-group">
              <label>Telefon numarası</label>
              <Field name="phone" type="text" />
              <ErrorMessage name="phone" component="div" className="form-error" />
            </div>
            <div className="form-group">
              <label>Adres</label>
              <Field name="address" type="text" />
              <ErrorMessage name="address" component="div" className="form-error" />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Şehir</label>
                <Field name="city" type="text" />
                <ErrorMessage name="city" component="div" className="form-error" />
              </div>
              <div className="form-group">
                <label>İlçe</label>
                <Field name="district" type="text" />
                <ErrorMessage name="district" component="div" className="form-error" />
              </div>
              <div className="form-group">
                <label>Posta Kodu</label>
                <Field name="postalCode" type="text" />
                <ErrorMessage name="postalCode" component="div" className="form-error" />
              </div>
            </div>
            <div className="form-group">
              <label>Fatura Tipi</label>
              <Field as="select" name="invoiceType">
                <option value="bireysel">Bireysel</option>
                <option value="kurumsal">Kurumsal</option>
              </Field>
              <ErrorMessage name="invoiceType" component="div" className="form-error" />
            </div>
            <div className="form-group">
              <label>Ödeme Bilgisi</label>
              <Field name="payment" type="text" placeholder="Kart numarası veya IBAN" />
              <ErrorMessage name="payment" component="div" className="form-error" />
            </div>
            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  checked={createAccount}
                  onChange={() => setCreateAccount((v) => !v)}
                />
                Hesap oluşturmak istiyorum
              </label>
            </div>
            <button type="submit">Siparişi Tamamla</button>
          </Form>
        </Formik>
      ) : (
        <Formik
          initialValues={{ address: "", card: "" }}
          validationSchema={RegisteredSchema}
          onSubmit={(values) => {
            alert("Siparişiniz başarıyla alındı!\n" + JSON.stringify(values, null, 2));
          }}
        >
          <Form>
            <div className="form-group">
              <label>Kayıtlı Adresler</label>
              <Field as="select" name="address">
                <option value="">Adres seçin</option>
                {addresses.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </Field>
              <ErrorMessage name="address" component="div" className="form-error" />
            </div>
            <div className="form-group">
              <label>Kayıtlı Kartlar</label>
              <Field as="select" name="card">
                <option value="">Kart seçin</option>
                {cards.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </Field>
              <ErrorMessage name="card" component="div" className="form-error" />
            </div>
            <button type="submit">Siparişi Tamamla</button>
          </Form>
        </Formik>
      )}
    </div>
  );
};

export default CheckoutForm;
