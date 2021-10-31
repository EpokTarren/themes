import { Builder } from '../build';
import { Palette } from '../colour';
import { normalize } from '../filenames';

const none = '#00000000';

function theme([name, palette]: [string, Palette]): { path: string; content: string } {
	const theme = {
		name: `Tarren's themes ${name}`,
		type: 'dark',
		colors: {
			focusBorder: none,
			foreground: palette.plain.hex,
			descriptionForeground: palette.plain.hex,
			errorForeground: palette.error.hex,
			'icon.foreground': palette.plain.hex,
			'sash.hoverBorder': palette.primary3.hex,
			'widget.shadow': none,
			'selection.background': palette.primary0.hex + '40',

			'window.activeBorder': palette.background0.hex,
			'window.inactiveBorder': palette.background0.hex,

			'textBlockQuote.background': palette.background1.hex,
			'textCodeBlock.background': palette.background1.hex,
			'textLink.activeForeground': palette.primary2.hex,
			'textLink.foreground': palette.primary0.hex,
			'textSeparator.foreground': palette.primary3.hex,

			'button.background': palette.primary0.hex,
			'button.secondaryBackground': palette.primary0.hex,
			'button.hoverBackground': palette.primary1.hex,
			'button.secondaryHoverBackground': palette.primary1.hex,
			'button.foreground': palette.plain.hex,
			'button.secondaryForeground': palette.plain.hex,

			'checkbox.foreground': palette.primary2.hex,
			'checkbox.border': palette.primary3.hex,
			'checkbox.background': palette.background2.hex,

			'dropdown.background': palette.background0.hex,
			'dropdown.listBackground': palette.background0.hex,
			'dropdown.border': palette.primary1.hex + '80',
			'dropdown.foreground': palette.plain.hex,

			'input.background': palette.background0.hex,
			'input.border': palette.primary1.hex + '80',
			'input.foreground': palette.plain.hex,
			'input.placeholderForeground': palette.plain.hex + 'cc',
			'inputOption.activeBackground': palette.background1.hex,
			'inputOption.activeBorder': palette.primary1.hex + 'cc',
			'inputOption.activeForeground': palette.plain.hex,
			'inputValidation.errorBackground': palette.background0.hex,
			'inputValidation.errorForeground': palette.error.hex,
			'inputValidation.errorBorder': palette.error.hex,
			'inputValidation.infoBackground': palette.background0.hex,
			'inputValidation.infoForeground': palette.hint.hex,
			'inputValidation.infoBorder': palette.primary0.hex + '80',
			'inputValidation.warningBackground': palette.background0.hex,
			'inputValidation.warningForeground': palette.warn.hex,
			'inputValidation.warningBorder': palette.warn.hex,

			'scrollbar.shadow': palette.background1.hex + '80',
			'scrollbarSlider.activeBackground': palette.background1.hex,
			'scrollbarSlider.background': palette.background0.hex,
			'scrollbarSlider.hoverBackground': palette.background1.hex,

			'badge.foreground': palette.plain.hex,
			'badge.background': palette.primary1.hex,

			'progressBar.background': palette.primary1.hex,

			'list.activeSelectionBackground': palette.background2.hex,
			'list.activeSelectionForeground': palette.primary3.hex,
			'list.dropBackground': palette.background2.hex,
			'list.focusBackground': palette.background2.hex,
			'list.focusForeground': palette.plain.hex,
			'list.focusOutline': none,
			'list.highlightForeground': palette.plain.hex,
			'list.hoverBackground': palette.background2.hex,
			'list.hoverForeground': palette.plain.hex,
			'list.inactiveSelectionBackground': palette.background1.hex,
			'list.inactiveSelectionForeground': palette.plain.hex,
			'list.inactiveFocusBackground': palette.background2.hex,
			'list.inactiveFocusOutline': none,
			'list.invalidItemForeground': palette.primary0.hex,
			'list.errorForeground': palette.error.hex,
			'list.warningForeground': palette.warn.hex,
			'listFilterWidget.background': palette.background0.hex,
			'listFilterWidget.outline': palette.background0.hex,
			'listFilterWidget.noMatchesOutline': none,
			'list.filterMatchBackground': palette.background0.hex,
			'list.filterMatchBorder': palette.background0.hex,
			'list.deemphasizedForeground': palette.plain.hex + 'cc',
			'tree.indentGuidesStroke': palette.primary3.hex,
			'tree.tableColumnsBorder': palette.primary3.hex,

			'activityBar.activeBackground': palette.background0.hex,
			'activityBar.background': palette.background0.hex,
			'activityBar.inactiveForeground': palette.plain.hex + 'cc',
			'activityBarBadge.foreground': palette.plain.hex,
			'activityBar.foreground': palette.plain.hex,
			'activityBarBadge.background': palette.primary1.hex,
			'activityBar.dropBorder': palette.primary1.hex,
			'activityBar.border': none,
			'activityBar.activeBorder': none,
			'activityBar.activeFocusBorder': none,

			'sideBar.background': palette.background0.hex,
			'sideBar.foreground': palette.plain.hex,
			'sideBar.border': none,
			'sideBar.dropBackground': palette.primary1.hex,
			'sideBarTitle.foreground': palette.plain.hex,
			'sideBarSectionHeader.background': palette.background1.hex,
			'sideBarSectionHeader.foreground': palette.plain.hex,
			'sideBarSectionHeader.border': none,

			'minimap.findMatchHighlight': palette.extra1.hex,
			'minimap.selectionHighlight': palette.primary2.hex,
			'minimap.errorHighlight': palette.error.hex,
			'minimap.warningHighlight': palette.warn.hex,
			'minimap.background': palette.background0.hex + '80',
			'minimapSlider.background': palette.background1.hex + '80',
			'minimapSlider.hoverBackground': palette.background1.hex + '80',
			'minimapSlider.activeBackground': palette.background1.hex + '80',
			'minimapGutter.addedBackground': palette.complementary1.hex,
			'minimapGutter.modifiedBackground': palette.extra1.hex,
			'minimapGutter.deletedBackground': palette.primary0.hex,

			'editorGroup.border': none,
			'editorGroupHeader.tabsBorder': none,
			'editorGroupHeader.border': none,
			'editorGroup.focusedEmptyBorder': none,
			'tab.border': none,
			'tab.activeBorderTop': none,
			'tab.unfocusedActiveBorderTop': none,
			'tab.lastPinnedBorder': none,
			'tab.unfocusedHoverBorder': palette.primary3.hex,
			'tab.activeModifiedBorder': palette.primary0.hex,
			'tab.unfocusedActiveModifiedBorder': palette.primary0.hex,
			'tab.hoverBorder': palette.primary1.hex,
			'editorGroup.dropBackground': palette.primary1.hex,
			'tab.activeBorder': palette.primary1.hex,
			'tab.unfocusedActiveBorder': palette.primary2.hex,
			'tab.inactiveModifiedBorder': palette.primary3.hex,
			'tab.unfocusedInactiveModifiedBorder': palette.primary3.hex,
			'editorGroupHeader.noTabsBackground': palette.background0.hex,
			'editorGroupHeader.tabsBackground': palette.background0.hex,
			'editorGroup.emptyBackground': palette.background0.hex,
			'tab.activeBackground': palette.background0.hex,
			'tab.unfocusedActiveBackground': palette.background0.hex,
			'tab.inactiveBackground': palette.background0.hex,
			'tab.unfocusedInactiveBackground': palette.background0.hex,
			'editorPane.background': palette.background0.hex,
			'tab.hoverBackground': palette.background1.hex,
			'tab.unfocusedHoverBackground': palette.background1.hex,
			'tab.activeForeground': palette.plain.hex,
			'tab.hoverForeground': palette.plain.hex,
			'tab.unfocusedHoverForeground': palette.plain.hex,
			'tab.inactiveForeground': palette.plain.hex + '80',
			'tab.unfocusedActiveForeground': palette.plain.hex + '80',
			'tab.unfocusedInactiveForeground': palette.plain.hex + '80',

			'editor.background': palette.background0.hex,
			'editor.foreground': palette.plain.hex,
			'editorLineNumber.foreground': palette.primary3.hex + '80',
			'editorLineNumber.activeForeground': palette.primary3.hex + 'cc',
			'editorCursor.background': palette.primary1.hex,
			'editorCursor.foreground': palette.primary1.hex,

			'editor.selectionBackground': palette.primary0.hex + '40',
			'editor.selectionForeground': palette.extra1.hex,
			'editor.inactiveSelectionBackground': palette.primary3.hex + '40',
			'editor.selectionHighlightBackground': palette.primary1.hex + '40',
			'editor.selectionHighlightBorder': none,

			'editor.wordHighlightBackground': palette.primary1.hex + '80',
			'editor.wordHighlightBorder': none,
			'editor.wordHighlightStrongBackground': palette.primary1.hex + '80',
			'editor.wordHighlightStrongBorder': none,

			'editor.findMatchBackground': palette.primary3.hex + '80',
			'editor.findMatchHighlightBackground': palette.primary2.hex + '80',
			'editor.findRangeHighlightBackground': palette.extra2.hex + '40',
			'editor.findMatchBorder': none,
			'editor.findMatchHighlightBorder': none,
			'editor.findRangeHighlightBorder': none,

			'searchEditor.findMatchBackground': palette.background0.hex,
			'searchEditor.findMatchBorder': none,
			'searchEditor.textInputBorder': palette.primary0.hex + '80',

			'editor.hoverHighlightBackground': palette.background0.hex,

			'editor.lineHighlightBackground': none,
			'editor.lineHighlightBorder': palette.primary0.hex + '40',

			'editorLink.activeForeground': palette.extra2.hex,

			'editor.rangeHighlightBackground': palette.primary0.hex + '40',
			'editor.rangeHighlightBorder': none,

			'editor.symbolHighlightBackground': palette.background0.hex,
			'editor.symbolHighlightBorder': none,

			'editorWhitespace.foreground': palette.primary3.hex + '80',
			'editorIndentGuide.background': palette.primary3.hex + '40',
			'editorIndentGuide.activeBackground': palette.primary3.hex + '80',

			'editorRuler.foreground': palette.primary0.hex + '80',
			'editor.linkedEditingBackground': palette.background0.hex,
			'editorCodeLens.foreground': palette.primary3.hex + '80',
			'editorLightBulb.foreground': palette.primary3.hex + '80',
			'editorLightBulbAutoFix.foreground': palette.primary3.hex + '80',

			'editorBracketMatch.background': palette.primary0.hex + '80',
			'editorBracketMatch.border': none,

			'editor.foldBackground': palette.background2.hex + '80',

			'editorOverviewRuler.border': none,

			'editorError.foreground': palette.error.hex,
			'editorError.border': none,
			'editorError.background': none,
			'editorWarning.foreground': palette.warn.hex,
			'editorWarning.border': none,
			'editorWarning.background': none,
			'editorInfo.foreground': palette.hint.hex,
			'editorInfo.border': none,
			'editorInfo.background': none,
			'editorHint.foreground': palette.hint.hex,
			'editorHint.border': none,
			'problemsErrorIcon.foreground': palette.error.hex,
			'problemsWarningIcon.foreground': palette.warn.hex,
			'problemsInfoIcon.foreground': palette.hint.hex,

			'editorUnnecessaryCode.border': none,
			'editorUnnecessaryCode.opacity': '#00000080',

			'editorGutter.background': palette.background0.hex,
			'editorGutter.modifiedBackground': palette.extra0.hex + '80',
			'editorGutter.addedBackground': palette.complementary0.hex + '80',
			'editorGutter.deletedBackground': palette.primary0.hex + '80',
			'editorGutter.commentRangeForeground': palette.background2.hex,
			'editorGutter.foldingControlForeground': palette.primary3.hex + 'cc',

			'diffEditor.insertedTextBackground': palette.complementary1.hex + '40',
			'diffEditor.insertedTextBorder': none,
			'diffEditor.removedTextBackground': palette.primary0.hex + '40',
			'diffEditor.removedTextBorder': none,
			'diffEditor.border': none,
			'diffEditor.diagonalFill': palette.background2.hex,

			'editorWidget.foreground': palette.plain.hex,
			'editorWidget.background': palette.background0.hex,
			'editorWidget.border': palette.background2.hex,
			'editorWidget.resizeBorder': palette.background2.hex,
			'editorSuggestWidget.background': palette.background0.hex,
			'editorSuggestWidget.border': none,
			'editorSuggestWidget.foreground': palette.plain.hex,
			'editorSuggestWidget.highlightForeground': palette.primary3.hex,
			'editorSuggestWidget.selectedBackground': palette.background2.hex,
			'editorHoverWidget.foreground': palette.plain.hex,
			'editorHoverWidget.background': palette.background0.hex,
			'editorHoverWidget.border': palette.primary0.hex + '80',
			'editorHoverWidget.statusBarBackground': palette.background1.hex,

			'debugExceptionWidget.background': palette.background2.hex,
			'debugExceptionWidget.border': none,

			'editorMarkerNavigation.background': palette.background0.hex,
			'editorMarkerNavigationError.background': palette.error.hex,
			'editorMarkerNavigationWarning.background': palette.warn.hex,
			'editorMarkerNavigationInfo.background': palette.hint.hex,

			'peekView.border': none,
			'peekViewEditor.background': palette.background1.hex,
			'peekViewEditorGutter.background': palette.background2.hex,
			'peekViewEditor.matchHighlightBackground': palette.primary0.hex + '40',
			'peekViewEditor.matchHighlightBorder': none,
			'peekViewResult.background': palette.background2.hex,
			'peekViewResult.fileForeground': palette.plain.hex,
			'peekViewResult.matchHighlightBackground': palette.primary0.hex + '40',
			'peekViewResult.selectionBackground': palette.primary1.hex + '40',
			'peekViewResult.selectionForeground': palette.plain.hex,
			'peekViewTitle.background': palette.background2.hex,
			'peekViewTitleDescription.foreground': palette.plain.hex,
			'peekViewTitleLabel.foreground': palette.plain.hex,

			'merge.currentHeaderBackground': palette.complementary1.hex + '80',
			'merge.currentContentBackground': palette.complementary1.hex + '40',
			'merge.incomingHeaderBackground': palette.extra1.hex + '80',
			'merge.incomingContentBackground': palette.extra1.hex + '40',
			'merge.border': none,
			'merge.commonContentBackground': none,
			'merge.commonHeaderBackground': none,
			'editorOverviewRuler.currentContentForeground': palette.complementary1.hex + 'cc',
			'editorOverviewRuler.incomingContentForeground': palette.extra1.hex + 'cc',
			'editorOverviewRuler.commonContentForeground': palette.primary2.hex + '80',

			'panel.background': palette.background0.hex,
			'panel.border': none,
			'panel.dropBorder': palette.primary1.hex,
			'panelTitle.activeBorder': palette.primary1.hex,
			'panelTitle.activeForeground': palette.primary3.hex,
			'panelTitle.inactiveForeground': palette.plain.hex,
			'panelInput.border': none,
			'panelSection.border': none,
			'panelSection.dropBackground': palette.extra0.hex,
			'panelSectionHeader.background': palette.background0.hex,
			'panelSectionHeader.foreground': palette.plain.hex,
			'panelSectionHeader.border': none,

			'imagePreview.border': palette.background2.hex,

			'statusBar.background': palette.background0.hex,
			'statusBar.foreground': palette.plain.hex + 'cc',
			'statusBar.border': none,
			'statusBar.debuggingBackground': palette.background1.hex,
			'statusBar.debuggingForeground': palette.plain.hex,
			'statusBar.debuggingBorder': none,
			'statusBar.noFolderForeground': palette.background1.hex,
			'statusBar.noFolderBackground': palette.plain.hex + 'cc',
			'statusBar.noFolderBorder': none,
			'statusBarItem.activeBackground': palette.background1.hex,
			'statusBarItem.hoverBackground': palette.background2.hex,
			'statusBarItem.prominentForeground': palette.plain.hex,
			'statusBarItem.prominentBackground': palette.background2.hex,
			'statusBarItem.prominentHoverBackground': palette.background2.hex,
			'statusBarItem.remoteBackground': palette.extra0.hex + '80',
			'statusBarItem.remoteForeground': palette.plain.hex,
			'statusBarItem.errorBackground': palette.error.hex + '80',
			'statusBarItem.errorForeground': palette.plain.hex,

			'titleBar.activeBackground': palette.background0.hex,
			'titleBar.activeForeground': palette.plain.hex,
			'titleBar.inactiveBackground': palette.background0.hex,
			'titleBar.inactiveForeground': palette.plain.hex + '80',
			'titleBar.border': none,

			'menubar.selectionForeground': palette.plain.hex,
			'menubar.selectionBackground': palette.background1.hex,
			'menubar.selectionBorder': none,
			'menu.foreground': palette.plain.hex + 'cc',
			'menu.background': palette.background0.hex,
			'menu.selectionForeground': palette.plain.hex,
			'menu.selectionBackground': palette.background1.hex,
			'menu.selectionBorder': none,
			'menu.separatorBackground': palette.background0.hex,
			'menu.border': none,

			'notificationCenter.border': none,
			'notificationCenterHeader.foreground': palette.plain.hex,
			'notificationCenterHeader.background': palette.background2.hex,
			'notificationToast.border': none,
			'notifications.foreground': palette.plain.hex,
			'notifications.background': palette.background1.hex,
			'notifications.border': none,
			'notificationLink.foreground': palette.primary1.hex,
			'notificationsErrorIcon.foreground': palette.error.hex,
			'notificationsWarningIcon.foreground': palette.warn.hex,
			'notificationsInfoIcon.foreground': palette.hint.hex,

			'extensionButton.prominentForeground': palette.plain.hex,
			'extensionButton.prominentBackground': palette.primary0.hex,
			'extensionButton.prominentHoverBackground': palette.primary2.hex,
			'extensionBadge.remoteBackground': palette.extra0.hex,
			'extensionBadge.remoteForeground': palette.plain.hex,
			'extensionIcon.starForeground': palette.primary3.hex,

			'pickerGroup.border': none,
			'pickerGroup.foreground': palette.background2.hex,
			'quickInput.background': palette.background0.hex,
			'quickInput.foreground': palette.plain.hex,
			'quickInputList.focusBackground': palette.background2.hex,
			'quickInputTitle.background': palette.background1.hex,

			'settings.headerForeground': palette.plain.hex,
			'settings.modifiedItemIndicator': palette.primary0.hex,
			'settings.dropdownBackground': palette.background0.hex,
			'settings.dropdownForeground': palette.plain.hex,
			'settings.dropdownBorder': none,
			'settings.dropdownListBorder': none,
			'settings.checkboxBackground': palette.background0.hex,
			'settings.checkboxForeground': palette.primary2.hex,
			'settings.checkboxBorder': palette.primary2.hex,
			'settings.textInputBackground': palette.background0.hex,
			'settings.textInputForeground': palette.plain.hex,
			'settings.textInputBorder': palette.primary0.hex + '80',
			'settings.numberInputBackground': palette.background0.hex,
			'settings.numberInputForeground': palette.plain.hex,
			'settings.numberInputBorder': none,
			'settings.focusedRowBackground': palette.background1.hex,
			'notebook.focusedRowBorder': palette.primary0.hex,
			'notebook.rowHoverBackground': palette.background1.hex,

			'breadcrumb.foreground': palette.plain.hex,
			'breadcrumb.background': palette.background0.hex,
			'breadcrumb.focusForeground': palette.plain.hex,
			'breadcrumb.activeSelectionForeground': palette.primary3.hex,
			'breadcrumbPicker.background': palette.background0.hex,

			'symbolIcon.arrayForeground': palette.extra1.hex,
			'symbolIcon.booleanForeground': palette.extra1.hex,
			'symbolIcon.classForeground': palette.extra1.hex,
			'symbolIcon.colorForeground': palette.extra1.hex,
			'symbolIcon.constantForeground': palette.primary2.hex,
			'symbolIcon.constructorForeground': palette.primary2.hex,
			'symbolIcon.enumeratorForeground': palette.primary1.hex,
			'symbolIcon.enumeratorMemberForeground': palette.plain.hex,
			'symbolIcon.eventForeground': palette.extra1.hex,
			'symbolIcon.fieldForeground': palette.extra1.hex,
			'symbolIcon.fileForeground': palette.primary3.hex,
			'symbolIcon.folderForeground': palette.primary2.hex,
			'symbolIcon.functionForeground': palette.primary1.hex,
			'symbolIcon.interfaceForeground': palette.extra1.hex,
			'symbolIcon.keyForeground': palette.extra0.hex,
			'symbolIcon.keywordForeground': palette.extra2.hex,
			'symbolIcon.methodForeground': palette.primary1.hex,
			'symbolIcon.moduleForeground': palette.extra2.hex,
			'symbolIcon.namespaceForeground': palette.extra2.hex,
			'symbolIcon.nullForeground': palette.extra0.hex,
			'symbolIcon.numberForeground': palette.extra1.hex,
			'symbolIcon.objectForeground': palette.extra0.hex,
			'symbolIcon.operatorForeground': palette.primary3.hex,
			'symbolIcon.packageForeground': palette.primary0.hex,
			'symbolIcon.propertyForeground': palette.plain.hex,
			'symbolIcon.referenceForeground': palette.primary3.hex,
			'symbolIcon.snippetForeground': palette.plain.hex,
			'symbolIcon.stringForeground': palette.complementary0.hex,
			'symbolIcon.structForeground': palette.extra1.hex,
			'symbolIcon.textForeground': palette.plain.hex,
			'symbolIcon.typeParameterForeground': palette.plain.hex,
			'symbolIcon.unitForeground': palette.extra0.hex,
			'symbolIcon.variableForeground': palette.primary2.hex,
		},
		tokenColors: [
			{
				name: 'Comment',
				scope: ['comment', 'punctuation.definition.comment'],
				settings: {
					fontStyle: 'italic',
					foreground: palette.plain.hex + '80',
				},
			},
			{
				name: 'Variables',
				scope: ['variable', 'string constant.other.placeholder'],
				settings: {
					foreground: palette.plain.hex,
				},
			},
			{
				name: 'Colors',
				scope: ['constant.other.color'],
				settings: {
					foreground: palette.plain.hex,
				},
			},
			{
				name: 'Invalid',
				scope: ['invalid', 'invalid.illegal'],
				settings: {
					foreground: '#FF4040',
				},
			},
			{
				name: 'Keyword, Storage',
				scope: ['keyword', 'storage.type', 'storage.modifier'],
				settings: {
					foreground: palette.primary1.hex,
				},
			},
			{
				name: 'Operator, Misc',
				scope: ['keyword.control', 'constant.other.color'],
				settings: {
					foreground: palette.extra2.hex,
				},
			},
			{
				name: 'Punctuation',
				scope: [
					'punctuation',
					'meta.tag',
					'punctuation.definition.tag',
					'punctuation.separator.inheritance.php',
					'punctuation.definition.tag.html',
					'punctuation.definition.tag.begin.html',
					'punctuation.definition.tag.end.html',
					'punctuation.section.embedded',
					'keyword.other.template',
					'keyword.other.substitution',
				],
				settings: {
					foreground: palette.complementary0.hex,
				},
			},
			{
				name: 'Tag',
				scope: ['entity.name.tag', 'meta.tag.sgml', 'markup.deleted.git_gutter'],
				settings: {
					foreground: palette.primary0.hex,
				},
			},
			{
				name: 'Function, Special Method',
				scope: [
					'entity.name.function',
					'meta.function-call',
					'variable.function',
					'support.function',
					'keyword.other.special-method',
				],
				settings: {
					foreground: palette.primary0.hex,
				},
			},
			{
				name: 'Block Level Variables',
				scope: ['meta.block variable.other'],
				settings: {
					foreground: palette.plain.hex,
				},
			},
			{
				name: 'Other Variable, String Link',
				scope: ['support.other.variable', 'string.other.link'],
				settings: {
					foreground: palette.primary2.hex,
				},
			},
			{
				name: 'Number, Constant, Function Argument, Tag Attribute, Embedded',
				scope: [
					'constant.numeric',
					'constant.language',
					'support.constant',
					'constant.character',
					'constant.escape',
					'variable.parameter',
					'keyword.other.unit',
					'keyword.other',
				],
				settings: {
					foreground: palette.extra0.hex,
				},
			},
			{
				name: 'String, Symbols, Markup Heading',
				scope: [
					'string',
					'constant.other.symbol',
					'constant.other.key',
					'markup.heading',
					'markup.inserted.git_gutter',
					'meta.group.braces.curly constant.other.object.key.js string.unquoted.label.js',
				],
				settings: {
					foreground: palette.complementary1.hex,
				},
			},
			{
				name: 'Class, Inherited Class, Support',
				scope: [
					'entity.name',
					'support.type',
					'support.class',
					'support.orther.namespace.use.php',
					'meta.use.php',
					'support.other.namespace.php',
					'markup.changed.git_gutter',
					'support.type.sys-types',
					'entity.other.inherited-class',
				],
				settings: {
					foreground: palette.extra1.hex,
				},
			},
			{
				name: 'Entity Types',
				scope: ['support.type'],
				settings: {
					foreground: palette.extra1.hex,
				},
			},
			{
				name: 'CSS Class and Support',
				scope: [
					'source.css support.type.property-name',
					'source.sass support.type.property-name',
					'source.scss support.type.property-name',
					'source.less support.type.property-name',
					'source.stylus support.type.property-name',
					'source.postcss support.type.property-name',
				],
				settings: {
					foreground: palette.complementary1.hex,
				},
			},
			{
				name: 'Sub-methods',
				scope: ['entity.name.module.js', 'variable.import.parameter.js', 'variable.other.class.js'],
				settings: {
					foreground: palette.primary0.hex,
				},
			},
			{
				name: 'Language methods',
				scope: ['variable.language'],
				settings: {
					fontStyle: 'italic',
					foreground: palette.extra2.hex,
				},
			},
			{
				name: 'entity.name.method.js',
				scope: ['entity.name.method.js'],
				settings: {
					fontStyle: 'italic',
					foreground: palette.primary0.hex,
				},
			},
			{
				name: 'meta.method.js',
				scope: ['meta.class-method.js entity.name.function.js', 'variable.function.constructor'],
				settings: {
					foreground: palette.primary0.hex,
				},
			},
			{
				name: 'Attributes',
				scope: ['entity.other.attribute-name'],
				settings: {
					foreground: palette.extra1.hex,
				},
			},
			{
				name: 'HTML Attributes',
				scope: ['text.html.basic entity.other.attribute-name.html', 'text.html.basic entity.other.attribute-name'],
				settings: {
					fontStyle: 'italic',
					foreground: palette.extra1.hex,
				},
			},
			{
				name: 'CSS Classes',
				scope: ['entity.other.attribute-name.class'],
				settings: {
					foreground: palette.extra1.hex,
				},
			},
			{
				name: "CSS ID's",
				scope: ['source.sass keyword.control'],
				settings: {
					foreground: palette.extra0.hex,
				},
			},
			{
				name: 'Inserted',
				scope: ['markup.inserted'],
				settings: {
					foreground: palette.complementary0.hex,
				},
			},
			{
				name: 'Deleted',
				scope: ['markup.deleted'],
				settings: {
					foreground: palette.primary0.hex,
				},
			},
			{
				name: 'Changed',
				scope: ['markup.changed'],
				settings: {
					foreground: palette.extra0.hex,
				},
			},
			{
				name: 'Regular Expressions',
				scope: ['string.regexp'],
				settings: {
					foreground: palette.extra2.hex,
				},
			},
			{
				name: 'Escape Characters',
				scope: ['constant.character.escape'],
				settings: {
					foreground: palette.complementary1.hex,
				},
			},
			{
				name: 'URL',
				scope: ['*url*', '*link*', '*uri*'],
				settings: {
					foreground: palette.complementary1.hex,
					fontStyle: 'underline',
				},
			},
			{
				name: 'Decorators',
				scope: ['tag.decorator.js entity.name.tag.js', 'tag.decorator.js punctuation.definition.tag.js'],
				settings: {
					fontStyle: 'italic',
					foreground: palette.primary0.hex,
				},
			},
			{
				name: 'ES7 Bind Operator',
				scope: ['source.js constant.other.object.key.js string.unquoted.label.js'],
				settings: {
					fontStyle: 'italic',
					foreground: palette.primary2.hex,
				},
			},
			{
				name: 'JSON Key - Level 0',
				scope: ['source.json meta.structure.dictionary.json support.type.property-name.json'],
				settings: {
					foreground: palette.primary1.hex,
				},
			},
			{
				name: 'JSON Key - Level 1',
				scope: [
					'source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json',
				],
				settings: {
					foreground: palette.complementary0.hex,
				},
			},
			{
				name: 'JSON Key - Level 2',
				scope: [
					'source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json',
				],
				settings: {
					foreground: palette.extra0.hex,
				},
			},
			{
				name: 'JSON Key - Level 3',
				scope: [
					'source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json',
				],
				settings: {
					foreground: palette.primary2.hex,
				},
			},
			{
				name: 'JSON Key - Level 4',
				scope: [
					'source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json',
				],
				settings: {
					foreground: palette.complementary1.hex,
				},
			},
			{
				name: 'JSON Key - Level 5',
				scope: [
					'source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json',
				],
				settings: {
					foreground: palette.extra2.hex,
				},
			},
			{
				name: 'JSON Key - Level 6',
				scope: [
					'source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json',
				],
				settings: {
					foreground: palette.primary2.hex,
				},
			},
			{
				name: 'JSON Key - Level 7',
				scope: [
					'source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json',
				],
				settings: {
					foreground: palette.extra0.hex,
				},
			},
			{
				name: 'JSON Key - Level 8',
				scope: [
					'source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json',
				],
				settings: {
					foreground: palette.complementary0.hex,
				},
			},
			{
				name: 'Markdown - Plain',
				scope: ['text.html.markdown', 'punctuation.definition.list_item.markdown'],
				settings: {
					foreground: palette.plain.hex,
				},
			},
			{
				name: 'Markdown - Markup Raw Inline',
				scope: ['text.html.markdown markup.inline.raw.markdown'],
				settings: {
					foreground: palette.plain.hex,
				},
			},
			{
				name: 'Markdown - Markup Raw Inline Punctuation',
				scope: ['text.html.markdown markup.inline.raw.markdown punctuation.definition.raw.markdown'],
				settings: {
					foreground: palette.primary2.hex,
				},
			},
			{
				name: 'Markdown - Heading',
				scope: [
					'markdown.heading',
					'markup.heading | markup.heading entity.name',
					'markup.heading.markdown punctuation.definition.heading.markdown',
				],
				settings: {
					foreground: palette.primary0.hex,
				},
			},
			{
				name: 'Markup - Italic',
				scope: ['markup.italic'],
				settings: {
					fontStyle: 'italic',
					foreground: palette.primary0.hex,
				},
			},
			{
				name: 'Markup - Bold',
				scope: ['markup.bold', 'markup.bold string'],
				settings: {
					fontStyle: 'bold',
					foreground: palette.primary0.hex,
				},
			},
			{
				name: 'Markup - Bold-Italic',
				scope: [
					'markup.bold markup.italic',
					'markup.italic markup.bold',
					'markup.quote markup.bold',
					'markup.bold markup.italic string',
					'markup.italic markup.bold string',
					'markup.quote markup.bold string',
				],
				settings: {
					fontStyle: 'bold',
					foreground: palette.primary0.hex,
				},
			},
			{
				name: 'Markup - Underline',
				scope: ['markup.underline'],
				settings: {
					fontStyle: 'underline',
					foreground: palette.primary0.hex,
				},
			},
			{
				name: 'Markdown - Blockquote',
				scope: ['markup.quote punctuation.definition.blockquote.markdown'],
				settings: {
					foreground: palette.primary2.hex,
				},
			},
			{
				name: 'Markup - Quote',
				scope: ['markup.quote'],
				settings: {
					fontStyle: 'italic',
					foreground: palette.primary2.hex,
				},
			},
			{
				name: 'Markdown - Link',
				scope: ['string.other.link.title.markdown'],
				settings: {
					foreground: palette.primary1.hex,
				},
			},
			{
				name: 'Markdown - Link Description',
				scope: ['string.other.link.description.title.markdown'],
				settings: {
					foreground: palette.plain.hex,
				},
			},
			{
				name: 'Markdown - Link Anchor',
				scope: ['constant.other.reference.link.markdown'],
				settings: {
					foreground: palette.primary0.hex,
				},
			},
			{
				name: 'Markup - Raw Block',
				scope: ['markup.raw.block'],
				settings: {
					foreground: palette.primary1.hex,
				},
			},
			{
				name: 'Markdown - Raw Block Fenced',
				scope: ['markup.raw.block.fenced.markdown'],
				settings: {
					foreground: '#00000050',
				},
			},
			{
				name: 'Markdown - Fenced Bode Block',
				scope: ['punctuation.definition.fenced.markdown'],
				settings: {
					foreground: '#00000050',
				},
			},
			{
				name: 'Markdown - Fenced Bode Block Variable',
				scope: [
					'markup.raw.block.fenced.markdown',
					'variable.language.fenced.markdown',
					'punctuation.section.class.end',
				],
				settings: {
					foreground: palette.plain.hex,
				},
			},
			{
				name: 'Markdown - Fenced Language',
				scope: ['variable.language.fenced.markdown'],
				settings: {
					foreground: palette.primary1.hex,
				},
			},
			{
				name: 'Markdown - Separator',
				scope: ['meta.separator'],
				settings: {
					fontStyle: 'bold',
					foreground: palette.primary2.hex,
				},
			},
			{
				name: 'Markup - Table',
				scope: ['markup.table'],
				settings: {
					foreground: palette.primary2.hex,
				},
			},
		],
	};

	return { path: `dist/${normalize(name)}.json`, content: JSON.stringify(theme, undefined, '\t') };
}

const generate: Builder = (
	palettes,
	{ name, displayName, description, version, author, publisher, license, repository }
) => {
	const pkg = {
		name,
		displayName,
		description,
		version,
		author,
		publisher,
		license,
		repository,
		engines: {
			vscode: '^1.29.0',
		},
		categories: ['Themes'],
		contributes: {
			themes: palettes.reduce(
				(acc, [name]) => [
					...acc,
					{
						label: `Tarren's themes ${name}`,
						uiTheme: 'vs-dark',
						path: `./dist/${normalize(name)}.json`,
					},
				],
				[] as { label: string; uiTheme: string; path: string }[]
			),
		},
	};

	return [...palettes.map(theme), { path: 'package.json', content: JSON.stringify(pkg, undefined, '\t') }];
};

export = generate;
