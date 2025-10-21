import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const CustomerInfoSchema = Yup.object().shape({
  fullName: Yup.string().required("Ad Soyad zorunlu"),
  email: Yup.string()
    .email("Geçerli bir e-posta girin")
    .required("E-posta zorunlu"),
  phone: Yup.string().required("Telefon numarası zorunlu"),
  idNumber: Yup.string().required("TC Kimlik/Vergi No zorunlu"),
});

const CustomerInfoForm = ({
  onSubmit,
}: {
  onSubmit: (values: any) => void;
}) => (
  <div className="customer-info-form">
    <h2>Kullanıcı / Müşteri Bilgileri</h2>
    <Formik
      initialValues={{ fullName: "", email: "", phone: "", idNumber: "" }}
      validationSchema={CustomerInfoSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <div className="form-group">
          <label>Ad Soyad</label>
          <Field name="fullName" type="text" />
          <ErrorMessage
            name="fullName"
            component="div"
            className="form-error"
          />
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
          <label>TC Kimlik / Vergi Numarası</label>
          <Field name="idNumber" type="text" />
          <ErrorMessage
            name="idNumber"
            component="div"
            className="form-error"
          />
        </div>
        <button type="submit">Devam Et</button>
      </Form>
    </Formik>
  </div>
);

export default CustomerInfoForm;
