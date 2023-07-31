import Button from "@/components/controls/Button";
import Form from "@/components/controls/Form";
import FormGroup from "@/components/controls/FormGroup";
import Input from "@/components/controls/Input";
import axios from "axios";
import Box from "@/components/controls/Box";
import * as yup from "yup";
import { IDesignationDoc } from "@/models/designation";
import { designationService } from "@/services/designaion.service";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { AppContent } from "@/utils/content";
import useFocus from "@/hooks/useFocus";

const validation = yup.object().shape({
  title: yup.string().required("Skill name is required!"),
  slug: yup.string(),
});

type DesignationProps = {
  designation?: IDesignationDoc;
  onClose?: () => void;
};

const DesignationForm = ({
  designation,
  onClose,
  ...rest
}: DesignationProps) => {
  const router = useRouter();
  const inpRef = useFocus();
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    initialValues: designation ?? designationService.getIntialData(),
    validationSchema: validation,
    async onSubmit(values, { resetForm }) {
      try {
        let response = null;
        if (values.id) {
          response = await designationService.update(values as IDesignationDoc);
        } else {
          response = await designationService.add(values);
        }

        const message =
          response.status === 200
            ? "Designation updated!"
            : "Designation added!";

        if (response.status === 200 || response.status === 201) {
          toast.success(message);
          onClose?.();
          resetForm();
          router.refresh();
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data.errors.message);
        }
      }
    },
  });

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Input
          name="title"
          ref={inpRef}
          value={values.title}
          errors={errors}
          touched={touched}
          onBlur={handleBlur}
          onChange={handleChange}
        />
      </FormGroup>

      <Box className="d-flex justify-content-end">
        <Button type="button" className="me-3" onClick={onClose}>
          {AppContent.cancel}
        </Button>
        <Button
          loading={isSubmitting}
          disabled={values.title.length === 0 || isSubmitting}
          type="submit"
        >
          {values.id ? AppContent.update : AppContent.save}
        </Button>
      </Box>
    </Form>
  );
};
export default DesignationForm;
