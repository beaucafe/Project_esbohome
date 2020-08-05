const Department = `SELECT [ICDEPT_KEY] as id
,ICDEPT_CODE as dept_code
,ICDEPT_THAIDESC as dept_thaidesc
,ICDEPT_ENGDESC as dept_engesc
,ICDEPT_ACCESS as dept_access
,ICDEPT_LEVEL as  dept_level
,ICDEPT_ABS_INDEX as dept_abs_index
,ICDEPT_PARENT as dept_parent
,ICDEPT_P_ABS_INDEX as ept_p_abs_index
,ICDEPT_FIRSTCHILD as dept_firschild
FROM ICDEPT`

export default Department