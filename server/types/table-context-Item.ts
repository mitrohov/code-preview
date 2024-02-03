interface DropdownItem {
  label: string // Название пункта
  icon: string // Иконка
  command: () => void; // Событие при клике
}

export interface TableContextItem {
  label: string // Название группы
  items: DropdownItem[],
}
