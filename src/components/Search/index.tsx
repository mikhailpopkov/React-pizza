import React from "react";
import styles from "./Search.module.scss";
import debounce from "lodash.debounce";
import { useDispatch } from "react-redux";
import { setSearchValue} from "../../redux/slices/filterSlice";

function Search () {

    const dispatch = useDispatch();
    const [inputValue, setInputValue] = React.useState('');
    const inputRef = React.useRef<HTMLInputElement>(null);

    const inputDebounce = React.useCallback(
        debounce((str: string) => {
        dispatch(setSearchValue(str));
    }, 500), []);
    
    const onClickClear = () => {
        dispatch(setSearchValue(''));
        setInputValue('');
        inputRef.current?.focus();
    }

    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
        inputDebounce(event.target.value);
    }

    return (
        <div className={styles.wrapper}>
            <svg className={styles.searchIcon} xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="20" height="20"><path d="M23.707,22.293l-5.969-5.969a10.016,10.016,0,1,0-1.414,1.414l5.969,5.969a1,1,0,0,0,1.414-1.414ZM10,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,10,18Z"/></svg>
            <input ref={inputRef} value={inputValue} onChange={onChangeInput} className={styles.input} type="text" placeholder="Поиск пиццы" />
            {inputValue && <svg onClick={onClickClear} className={styles.closeIcon} version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 512.021 512.021" width="20" height="20">
                <g>
                    <path d="M301.258,256.01L502.645,54.645c12.501-12.501,12.501-32.769,0-45.269c-12.501-12.501-32.769-12.501-45.269,0l0,0   L256.01,210.762L54.645,9.376c-12.501-12.501-32.769-12.501-45.269,0s-12.501,32.769,0,45.269L210.762,256.01L9.376,457.376   c-12.501,12.501-12.501,32.769,0,45.269s32.769,12.501,45.269,0L256.01,301.258l201.365,201.387   c12.501,12.501,32.769,12.501,45.269,0c12.501-12.501,12.501-32.769,0-45.269L301.258,256.01z"/>
                </g>
            </svg>}
        </div>
    )
}

export default Search;