import dayjs from "dayjs";
import { useState } from "react";
import { useModals } from "src/contexts/modal-provider/use-modals";
import { useUser } from "src/contexts/user-provider/use-user";
import { UseDarkDatePickerModalT } from "./types";

export const useDarkDatePickerModal = ({
  range: init,
  setRange: submitRange,
}: UseDarkDatePickerModalT) => {
  const now = dayjs(new Date());
  const todayStart = now.startOf("day").toDate();
  const todayEnd = now.toDate();

  const { user } = useUser();

  const { onCloseLastModal } = useModals();
  const [range, setRange] = useState<{ from: Date | null; to: Date | null }>(
    init,
  );
  const { from, to } = range;

  const creatingUserDate = dayjs(new Date()).toDate();

  const submit = () => {
    const isSomeNotExist = !from || !to;

    submitRange(
      isSomeNotExist
        ? { from: todayStart, to: todayEnd }
        : { from, to: dayjs(to).add(12, "hour").toDate() },
    );
    onCloseLastModal();
  };

  return {
    range,
    setRange,
    from,
    to,
    onCloseLastModal,
    user,
    creatingUserDate,
    todayStart,
    todayEnd,
    submit,
  };
};

