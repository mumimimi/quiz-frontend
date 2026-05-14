import "react-datepicker/dist/react-datepicker.css";
import "src/features/modals/dark-date-picker-modal/index.css";
import { format } from "date-fns";
import { uk } from "date-fns/locale/uk";
import dayjs from "dayjs";
import DatePicker, { registerLocale } from "react-datepicker";
import type { DarkDatePickerModalProps } from "src/features/modals/dark-date-picker-modal/types";
import { useDarkDatePickerModal } from "src/features/modals/dark-date-picker-modal/use-dark-datepicker-modal";
import ModalsWrapper from "src/features/modals/modal-wrapper";
import { cn } from "src/utils/cn";

registerLocale("uk", uk);

const DarkDatePickerModal = ({
  closeModal,
  data,
  description,
  title,
}: DarkDatePickerModalProps): React.JSX.Element => {
  const {
    creatingUserDate,
    from,
    onCloseLastModal,
    setRange,
    to,
    todayEnd,
  } = useDarkDatePickerModal(data);

  return (
    <ModalsWrapper
      closeModal={closeModal}
      title={title}
      description={description}
      classNameModal="mt-40"
    >
      <div
        className={cn(
          "flex flex-col gap-4 text-gray-200 items-center font-cyber scale-[120%] relative",
        )}
      >
        <div className="flex items-center gap-2">
          <div className="flex gap-2 items-center bg-stone-800 py-1 px-2 rounded-xs border-2 border-stone-700">
            <span className="text-stone-200">Від:</span>
            <span className="px-2 py-1 bg-stone-900/90 rounded text-center text-stone-300">
              {from ? format(from, "dd.MM.yyyy") : "—"}
            </span>
          </div>

          <div className="flex gap-2 items-center bg-stone-800 py-1 px-2 rounded-xs border-2 border-stone-700">
            <span className="text-stone-200">До:</span>
            <span className="px-2 py-1 bg-stone-900/90 rounded text-center text-stone-300">
              {to ? format(to, "dd.MM.yyyy") : "—"}
            </span>
          </div>
        </div>

        <DatePicker
          inline
          selectsRange
          shouldCloseOnSelect={false}
          startDate={from}
          endDate={to}
          locale={uk}
          maxDate={todayEnd}
          minDate={dayjs(new Date()).toDate()}
          onChange={(update) => setRange({ from: update[0], to: update[1] })}
          calendarClassName="dark-datepicker"
          weekDayClassName={() => "font-cyber"}
          dayClassName={(date) => {
            const d = dayjs(date);

            if (
              d.isAfter(todayEnd, "day") ||
              d.isBefore(creatingUserDate, "day")
            ) {
              return "day-disabled font-cyber";
            }

            return "font-cyber";
          }}
          monthsShown={2}
          fixedHeight
        />
        <div className="w-1/2 relative">
          <button></button>

          <div
            onClick={() => {
              data.setRange({ from: new Date(), to: new Date() });
              onCloseLastModal();
            }}
            className={cn(
              "transition-transform-opacity duration-200 w-12 h-12 bg-contain bg-center bg-no-repeat absolute right-0 top-1/2 translate-1/2 -translate-y-1/2 translate-x-[120%] cursor-pointer",
            )}
            style={{
              backgroundImage: `url('/mc-images/ui-icons/cancel.png')`,
            }}
          />
        </div>
      </div>
    </ModalsWrapper>
  );
};

export default DarkDatePickerModal;

