export const RECORD_TYPES = {
    CHECK_IN: 'INGRESO',
    CHECK_OUT: 'EGRESO'
};

export const MESSAGES = {
    LOADING: 'Cargando...',
    SUCCESS: {
        CHECK_IN: 'Registro de ingreso exitoso',
        CHECK_OUT: 'Registro de egreso exitoso',
        EMPLOYEE_CREATED: 'Empleado creado exitosamente',
        EMPLOYEE_UPDATED: 'Empleado actualizado exitosamente',
        EMPLOYEE_DELETED: 'Empleado eliminado exitosamente'
    },
    ERROR: {
        GENERIC: 'Ha ocurrido un error',
        FETCH_EMPLOYEES: 'Error al cargar empleados',
        CREATE_EMPLOYEE: 'Error al crear empleado',
        UPDATE_EMPLOYEE: 'Error al actualizar empleado',
        DELETE_EMPLOYEE: 'Error al eliminar empleado',
        CHECK_IN: 'Error al registrar ingreso',
        CHECK_OUT: 'Error al registrar egreso'
    }
};