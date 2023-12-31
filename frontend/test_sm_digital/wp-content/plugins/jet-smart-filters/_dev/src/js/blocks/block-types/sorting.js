import { sortingIcon } from 'blocks/editor/icons';
import attributes from 'blocks/editor/attributes';
import options from 'blocks/editor/options';
import General from 'blocks/editor/panels/general';
import Repeater from 'blocks/editor/controls/repeater';
import TemplateRender from 'blocks/editor/controls/templateRender';
import {
	clone
} from 'includes/utility';

const { __ } = wp.i18n;

const {
	registerBlockType
} = wp.blocks;

const {
	InspectorControls
} = wp.editor;

const {
	PanelBody,
	SelectControl,
	TextControl
} = wp.components;

registerBlockType('jet-smart-filters/sorting', {
	title: __('Sorting'),
	icon: sortingIcon,
	category: 'jet-smart-filters',
	supports: {
		html: false
	},
	attributes: {
		// General
		content_provider: attributes.content_provider,
		apply_type: attributes.apply_type,
		apply_on: attributes.apply_on,
		apply_button: attributes.apply_button,
		apply_button_text: attributes.apply_button_text,
		sorting_label: attributes.sorting_label,
		sorting_placeholder: attributes.sorting_placeholder,
		sorting_list: attributes.sorting_list,
		query_id: attributes.query_id,
		additional_providers_enabled: attributes.additional_providers_enabled,
		additional_providers_list: attributes.additional_providers_list,
	},
	className: 'jet-smart-filters-sorting',
	edit: class extends wp.element.Component {
		render() {
			const props = this.props;

			const updateSortingRepeaterItem = (index, key, value) => {
				const sortingList = clone(props.attributes.sorting_list);
				sortingList[index][key] = value;

				props.setAttributes({ sorting_list: sortingList });
			};

			return [
				props.isSelected && (
					<InspectorControls
						key={'inspector'}
					>
						<General
							filterType='sorting'
							disabledControls={
								{
									apply_button_text: !props.attributes.apply_button ? true : false,
									apply_on: !['ajax', 'mixed'].includes(props.attributes.apply_type) ? true : false
								}
							}
							{...props}
						>
							<TextControl
								type="text"
								label={__('Label')}
								value={props.attributes.sorting_label}
								onChange={newValue => {
									props.setAttributes({ sorting_label: newValue });
								}}
							/>
							<TextControl
								type="text"
								label={__('Placeholder')}
								placeholder={__('Sort...')}
								value={props.attributes.sorting_placeholder}
								onChange={newValue => {
									props.setAttributes({ sorting_placeholder: newValue });
								}}
							/>
						</General>
						<PanelBody title={__('Sorting List')} initialOpen={false}>
							<Repeater
								data={props.attributes.sorting_list}
								default={{
									title: '',
									orderby: 'none',
									order: 'ASC'
								}}
								onChange={newData => {
									props.setAttributes({ sorting_list: newData });
								}}
							>
								{
									(item, index) =>
										<React.Fragment>
											<TextControl
												type="text"
												label={__('Title')}
												value={item.title}
												onChange={newValue => {
													updateSortingRepeaterItem(index, 'title', newValue);
												}}
											/>
											<SelectControl
												label={__('Order By')}
												value={item.orderby}
												options={options.sortingOrderby}
												onChange={newValue => {
													updateSortingRepeaterItem(index, 'orderby', newValue);
												}}
											/>
											{['meta_value', 'meta_value_num', 'clause_value'].includes(item.orderby) && (
												<TextControl
													type="text"
													label={__('Meta key')}
													value={item.meta_key}
													onChange={newValue => {
														updateSortingRepeaterItem(index, 'meta_key', newValue);
													}}
												/>
											)}
											{!['none', 'rand'].includes(item.orderby) && (
												<SelectControl
													label={__('Order')}
													value={item.order}
													options={options.sortingOrder}
													onChange={newValue => {
														updateSortingRepeaterItem(index, 'order', newValue);
													}}
												/>
											)}
										</React.Fragment>
								}
							</Repeater>
						</PanelBody>
					</InspectorControls>
				),
				<div class="jet-smart-filters-block-holder">
					<TemplateRender
						block="jet-smart-filters/sorting"
						attributes={props.attributes}
					/>
				</div>
			];
		}
	},
	save: () => {
		return null;
	}
});